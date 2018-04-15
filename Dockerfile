FROM node:9.11.1

ADD . /app/

WORKDIR /app

RUN yarn

ENV HOST 0.0.0.0
ENV PORT 80

CMD [ "npm", "start" ]