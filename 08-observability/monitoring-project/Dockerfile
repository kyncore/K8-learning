# Use an official Node.js runtime as a parent image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
