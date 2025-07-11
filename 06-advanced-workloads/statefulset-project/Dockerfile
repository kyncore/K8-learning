# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the application code into the container
COPY app.js .

# Make port 3000 available
EXPOSE 3000

# Run the app when the container launches
CMD ["node", "app.js"]
