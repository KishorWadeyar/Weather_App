const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Allow the frontend (running on host port 8080) to access the backend
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// Load the SECRET key from environment variables
const API_KEY = process.env.WEATHER_API_KEY;
const API_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

if (!API_KEY) {
  console.error("WEATHER_API_KEY is not set. Please check your .env file.");
  process.exit(1);
}

// Define the secure proxy endpoint: http://localhost:3000/api/weather?city=London
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send({ message: "City parameter is required." });
  }

  try {
    // The SECRET API key is used HERE, on the server-side, never exposed to the user.
    const weatherUrl = `${API_BASE_URL}&q=${city}&appid=${API_KEY}`;

    const response = await fetch(weatherUrl);
    const data = await response.json();

    // Pass the appropriate status code back to the frontend
    if (response.status === 404) {
      return res.status(404).json(data);
    }

    // Send the good data back to the frontend
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Weather proxy running securely on port ${port}`);
});
