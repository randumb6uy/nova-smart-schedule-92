# Use Node.js 18
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and TypeScript
RUN npm install
RUN npm install typescript @types/node ts-node --save

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ]