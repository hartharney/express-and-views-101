"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = exports.updateProductSchema = exports.createProductSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// user schema's
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().email({ tlds: { allow: false } }).required().messages({
        'string.email': '"{{#label}}" must be a valid email address e.g hello@mymail.com.',
    }),
    phoneNumber: joi_1.default.string().pattern(/^[+][0-9]{13}$/).required().label('Phone number').messages({
        'string.pattern.base': '"{{#label}}" must be a valid phone number with a "+" prefix followed by 13 digits (e.g., "+1234567890123").',
    }),
    fullName: joi_1.default.string().min(2).max(50).trim().required().label('First name'),
    gender: joi_1.default.string().trim().required(),
    address: joi_1.default.string().trim().required(),
    password: joi_1.default.string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
        'string.min': '"{{#label}}" must be at least 8 characters long.',
        'string.max': '"{{#label}}" must not exceed 20 characters.',
        'string.regex.base': `"{{#label}}" must include at least one uppercase letter, one lowercase letter, one symbol, and one number.`
    }),
    confirm_password: joi_1.default.string()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('confirm password')
        .messages({
        'any.only': '{{#label}} does not match the password.'
    })
});
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().email({ tlds: { allow: false } }).required(),
    password: joi_1.default.string().min(8).max(20).regex(/[0-9a-zA-Z_]/).required(),
});
//password schema's
exports.forgotPasswordSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().email({ tlds: { allow: false } }).required(),
});
exports.resetPasswordSchema = joi_1.default.object().keys({
    password: joi_1.default.string().min(8).max(20).regex(/[0-9a-zA-Z_]/).required(),
    confirm_password: joi_1.default.string().valid(joi_1.default.ref('password')).required()
        .label('confirm password').messages({ 'any.only': '{{#label}} does not match' })
});
// product schema's
exports.createProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().min(2).max(100).trim().required().label('Product name'),
    brand: joi_1.default.string().trim().required().label('brand name'),
    category: joi_1.default.string().trim().required(),
    description: joi_1.default.string().min(1).max(220).trim().required().label('Product description'),
    price: joi_1.default.number().required(),
    countInStock: joi_1.default.number().required().label('Count in stock'),
    imageUrl: joi_1.default.string().trim().required().label(' Image URL ')
});
exports.updateProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required().label('Product Name'),
    brand: joi_1.default.string().required().label('Brand Name'),
    category: joi_1.default.string().required().label('Category'),
    description: joi_1.default.string().required().label('Product Description'),
    price: joi_1.default.number().min(0).required().label('Price'),
    countInStock: joi_1.default.number().min(1).required().label('Count in stock'),
    imageUrl: joi_1.default.string().uri().required().label('Image URL'),
});
// formatting option... label
exports.option = {
    aboutEarly: false,
    errors: {
        wrap: {
            label: '',
        }
    }
};
