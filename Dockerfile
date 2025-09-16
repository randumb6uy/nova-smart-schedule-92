# Use Node.js 18
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install TypeScript globally
RUN npm install -g typescript

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and config files
COPY tsconfig.server.json ./
COPY src/ ./src/

# Create dist directory structure
RUN mkdir -p dist/server

# Build the application
RUN npx tsc -p tsconfig.server.json

# List contents of dist directory to verify build
RUN ls -la dist/ && ls -la dist/server/

# Expose port
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ]