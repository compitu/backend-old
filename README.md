## Description

Backend for the compitu todo app.

## Installation - npm

```bash
$ npm install
```

## Required env variables

```dotenv
# create env files in /environments/ folder
# dev.env for development, prod.env for production
# example env file:
JWT_ACCESS_SECRET_KEY=secretKey
JWT_REFRESH_SECRET_KEY=secretKey
JWT_ACCESS_EXPIRE_IN=1h
JWT_REFRESH_EXPIRE_IN=14d
DB_URI=mongodb://localhost:27017/compitu
SEEDER_PATH=/src/build/data/
FRONTEND_BASE_URL=http://localhost:4200
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Installation - docker

```bash
# run the following command in the project root
docker compose up -d
```
## Installation - from docker hub (docker-compose.yml)

```yaml
# Use mongo:bionic on arm based processors like Raspberry Pi
version: "3.9"

services:
  db:
    image: mongo:latest
    container_name: db_mongo
    restart: always
    ports:
      - "27017:27017"
    networks:
      - compitu
  compitu:
    image: compitu/backend:0.0.1
    container_name: compitu-backend
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - JWT_ACCESS_SECRET_KEY=secretKey
      - JWT_REFRESH_SECRET_KEY=secretKey@
      - JWT_ACCESS_EXPIRE_IN=1h
      - JWT_REFRESH_EXPIRE_IN=14d
      - SEEDER_PATH=/build/data/
      - DB_URI=mongodb://db_mongo/compitu
      - FRONTEND_BASE_URL=https://www.youradress.com
    networks:
      - compitu
networks:
  compitu:
    name: compitu
    driver: bridge
```

## Building images and pushing to docker hub
```shell
docker buildx build --push --platform linux/arm64/v8 --tag compitu/backend:0.0.1 .
```
