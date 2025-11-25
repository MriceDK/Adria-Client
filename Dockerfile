# Stage 1: Build stage using Node
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Add SonarScanner as a devDependency
RUN npm install -D @sonar/scan

# Copy your source code
COPY . .

# Build the app
ARG BUILD_ENV=dev
RUN npm run build:${BUILD_ENV}

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from the builder stage to nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
