FROM node:16.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

LABEL maintainer="m.pinchuk@mobidev.biz"

CMD ["npm", "run", "start:dev"]