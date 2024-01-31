FROM node:20.11.0-alpine

WORKDIR /app

RUN mkdir -p /app

COPY package.json /app

COPY . .

RUN npm install --frozen-lockfile

EXPOSE 5000

CMD [ "npm", "start:dev" ]