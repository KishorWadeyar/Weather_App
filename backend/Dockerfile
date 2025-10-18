# Use a Node.js base image (lightweight Alpine variant)
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the server code
COPY server.js .

# Specify the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]