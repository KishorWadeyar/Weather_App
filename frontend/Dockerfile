# Use a minimal Nginx image to serve static files
FROM nginx:alpine

# Copy all files from the frontend directory into Nginx's public folder
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]