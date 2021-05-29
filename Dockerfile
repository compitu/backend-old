# syntax=docker/dockerfile:1
FROM node:14.17-alpine3.10 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:14.17-alpine3.10

ENV NODE_ENV=prod

WORKDIR /app

COPY --from=build  /usr/src/app/node_modules ./node_modules
COPY --from=build  /usr/src/app/dist .
COPY --from=build  /usr/src/app/package.json .
COPY --from=build  /usr/src/app/package-lock.json .
COPY --from=build  /usr/src/app/src/build/ ./build/

CMD ["node", "main"]
