# Use Node.js 18
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/server ./src/server
COPY tsconfig.server.json ./

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ]