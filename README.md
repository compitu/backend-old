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
