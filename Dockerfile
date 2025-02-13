# Stage 1: Build the React/TypeScript project
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code (including the client directory)
COPY . .

# Debug: List files to verify the client directory is copied
RUN ls -R /app

# Build the project
RUN npm run build

# Stage 2: Serve the built project using Nginx
FROM nginx:1.27.4

# Copy the built artifacts from the previous stage
COPY --from=build /app/dist/public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]