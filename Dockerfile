FROM node:20-alpine

WORKDIR /test

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start"]