# Stage 1: Serve the built project using Nginx
FROM nginx:1.27.4

# Copy the built artifacts from the workflow
COPY ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]