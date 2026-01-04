FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Declare a volume mounted at /app
VOLUME ["/app"]

# Expose backend port
EXPOSE 3000

# Start the server

CMD ["npm","start"]