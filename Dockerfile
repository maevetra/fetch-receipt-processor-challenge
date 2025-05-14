# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default
ENV NODE_ENV=dev

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application listens on
EXPOSE 3000

# Run the application as non-root user
USER node

# Run the application
CMD npm run serve