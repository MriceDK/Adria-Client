# Stage 1: Build stage using Node
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json / yarn.lock for dependency install
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your source code
COPY . .

# Build the app with the specified environment argument
ARG BUILD_ENV=dev
RUN npm run build:${BUILD_ENV}

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from the builder stage to nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config (optional, add your nginx.conf in your project)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the container
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
