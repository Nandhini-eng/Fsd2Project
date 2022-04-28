FROM node:16-alpine

WORKDIR /fsd_project

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD npm start