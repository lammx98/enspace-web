# Dockerfile

# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run
FROM node:22-alpine AS runner

WORKDIR /app

# Copy built files and necessary resources from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
