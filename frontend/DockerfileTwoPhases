# Use a lightweight base image
FROM node:16-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the final image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only the build output and production dependencies from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

# Set production environment
ENV NODE_ENV production

# Expose the port if needed
# EXPOSE 5000

# Command to run the application
CMD ["npx", "serve", "build"]