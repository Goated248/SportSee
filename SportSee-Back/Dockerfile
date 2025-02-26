FROM node:lts-alpine

ADD . /app/
WORKDIR /app

RUN yarn

CMD [ "node", "app/index.js" ]

EXPOSE 3000