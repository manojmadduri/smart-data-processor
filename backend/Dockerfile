# Use an official Node image as base (includes Node.js and npm)
FROM node:18-slim  
# Install Python (and pip) in the image
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && rm -rf /var/lib/apt/lists/*
# Set working directory
WORKDIR /app
# Copy package files first
COPY package.json package-lock.json ./
# Install Node dependencies
RUN npm install
# Create Python virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
# Copy requirements.txt and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
# Copy the rest of the backend code
COPY . ./
# Set environment variables
ENV PORT=4000 UPLOAD_DIR=uploads PYTHON_PATH=/opt/venv/bin/python3
# Expose the port
EXPOSE 4000
# Start the Node server
CMD ["npm", "start"]
