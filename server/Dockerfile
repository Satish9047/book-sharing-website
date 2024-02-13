FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json .

COPY . .

RUN npm install

RUN npx prisma migrate dev --name init

EXPOSE 8080

CMD [ "npm", "run", "dev" ]