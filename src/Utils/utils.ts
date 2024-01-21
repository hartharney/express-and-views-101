import Joi from 'joi';

// user schema's

export const registerUserSchema = Joi.object().keys({
    email: Joi.string().lowercase().email({ tlds: { allow: false } }).required().messages({
        'string.email': '"{{#label}}" must be a valid email address e.g hello@mymail.com.',
      }),
    phoneNumber:  Joi.string().pattern(/^[+][0-9]{13}$/).required().label('Phone number').messages({
        'string.pattern.base': '"{{#label}}" must be a valid phone number with a "+" prefix followed by 13 digits (e.g., "+1234567890123").',
      }),
    fullName: Joi.string().min(2).max(50).trim().required().label('First name'),
    gender: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    password: Joi.string()
    .min(8)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': '"{{#label}}" must be at least 8 characters long.',
      'string.max': '"{{#label}}" must not exceed 20 characters.',
      'string.regex.base': `"{{#label}}" must include at least one uppercase letter, one lowercase letter, one symbol, and one number.`
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('confirm password')
    .messages({
      'any.only': '{{#label}} does not match the password.'
    })
})


export const loginUserSchema = Joi.object().keys({
    email: Joi.string().lowercase().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).max(20).regex(/[0-9a-zA-Z_]/).required(),
})


//password schema's

export const forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().lowercase().email({ tlds: { allow: false } }).required(),
})


export const resetPasswordSchema = Joi.object().keys({
    password: Joi.string().min(8).max(20).regex(/[0-9a-zA-Z_]/).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
    .label('confirm password').messages({'any.only': '{{#label}} does not match'})
})


// product schema's

export const createProductSchema = Joi.object().keys({
    name: Joi.string().min(2).max(100).trim().required().label('Product name'),
    brand: Joi.string().trim().required().label('brand name'),
    category: Joi.string().trim().required(),
    description: Joi.string().min(1).max(220).trim().required().label('Product description'),
    price:  Joi.number().required(),
    countInStock: Joi.number().required().label('Count in stock'),
    imageUrl: Joi.string().trim().required().label(' Image URL ')
})


export const updateProductSchema = Joi.object().keys({
    name: Joi.string().required().label('Product Name'),
    brand: Joi.string().required().label('Brand Name'),
    category: Joi.string().required().label('Category'),
    description: Joi.string().required().label('Product Description'),
    price: Joi.number().min(0).required().label('Price'),
    countInStock: Joi.number().min(1).required().label('Count in stock'),
    imageUrl: Joi.string().uri().required().label('Image URL'),
});


// formatting option... label

export const option = {
    aboutEarly: false,
    errors: {
        wrap: {
            label: '',
        }
    }
}