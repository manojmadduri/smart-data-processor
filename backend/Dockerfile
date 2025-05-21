# Use an official Node image as base (includes Node.js and npm)
FROM node:18-slim  
# Install Python (and pip) in the image
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*
# Set working directory
WORKDIR /app
# Copy backend files and install dependencies
COPY ./backend/package.json ./backend/package-lock.json ./backend/requirements.txt ./ 
RUN npm install        # install Node dependencies
RUN pip3 install -r requirements.txt   # install Python dependencies
# Copy the rest of the backend code
COPY ./backend/. ./    # copy all backend files (including scripts/)
# Set environment variables
ENV PORT=4000 UPLOAD_DIR=uploads PYTHON_PATH=python3
# Expose the port (for local testing; Render auto-exposes the correct port)
EXPOSE 4000
# Start the Node server
CMD ["npm", "start"]
