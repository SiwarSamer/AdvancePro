const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   
    
});

const signupSchema = Joi.object({
    UserName: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required().custom((value, helpers) => {
        if (!value.includes('@') || !value.endsWith('.com')) {
            return helpers.message('"email" must include "@" and end with ".com"');
        }
        return value;
    }),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).min(8).required()
}).unknown(true);

const addCrafterSchema = Joi.object({
    UserName: Joi.string().required(),
    email: Joi.string().email().required().custom((value, helpers) => {
        if (!value.includes('@') || !value.endsWith('.com')) {
            return helpers.message('"email" must include "@" and end with ".com"');
        }
        return value;
    }),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
}).unknown(true);


const addProjectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    level: Joi.string().required(),
    materials: Joi.string().required(),
    size: Joi.number().min(5).required(),
    organizer_email: Joi.string().email().required(),
    skills: Joi.string().required(),
    image: Joi.any() // Since image is optional, we don't require it
}).options({ abortEarly: false });


const updateProfileSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    profile_picture: Joi.string().optional()
}).options({ abortEarly: false });

const createEventSchema = Joi.object({
    EventName: Joi.string().required(),
   size: Joi.number().integer().min(0).required(),
    address: Joi.string().required()
});

const joineventSchema = Joi.object({
    title: Joi.string().required(),
    eventName: Joi.string().required(),
});



module.exports={loginSchema,signupSchema,addCrafterSchema,addProjectSchema,updateProfileSchema,createEventSchema,joineventSchema}