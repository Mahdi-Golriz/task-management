FROM node

ENV MONGO_DB_USERNAME=admin \ 
    MONGO_DB_PWD=password 

# Create and set working directory
WORKDIR /app/backend
# Copy package files
# COPY package*.json ./
# # Install dependencies
# RUN npm install
# Copy the rest of the application code
COPY . /app/backend

# Start the application
CMD [ "node", "app/dist/server.js" ]
