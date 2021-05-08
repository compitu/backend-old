import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    JWT_ACCESS_SECRET_KEY: Joi.string().required(),
    JWT_REFRESH_SECRET_KEY: Joi.string().required(),
    JWT_ACCESS_EXPIRE_IN: Joi.string().required(),
    JWT_REFRESH_EXPIRE_IN: Joi.string().required(),
    DB_URI: Joi.string().required(),
});
