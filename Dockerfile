FROM node:14-alpine

WORKDIR /home/app

COPY . ./

RUN yarn && yarn cache clean

EXPOSE 3333

CMD ["yarn", "dev:http"]

