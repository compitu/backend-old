/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({
    path: `./environments/${process.env.NODE_ENV}.env`,
});
const {Seeder} = require('mongo-seeding');
const path = require('path');

const config = {
    database: `${process.env.DB_URI}`,
    dropDatabase: false,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
    path.resolve(`.${process.env.SEEDER_PATH}`),
    {
        extensions: ['json'],
    }
);

export function seed(): void {
    seeder
        .import(collections)
        .then(() => console.log('Seed success'))
        .catch(() => console.log('Seed error'));
}
