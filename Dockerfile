FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# Use development mode for hot reloading
CMD ["npm", "start"] 