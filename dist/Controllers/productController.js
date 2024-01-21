"use strict";
// import { Request, Response } from 'express';
// import { option, createProductSchema, updateProductSchema } from '../Utils/utils';
// // import { UserInstance } from '../models/userSchema';
// import { v4 as uuidv4 } from 'uuid';
// import { ProductInstance } from '../models/productSchema';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllProducts = exports.updateProduct = exports.deleteProduct = exports.createProduct = void 0;
const utils_1 = require("../Utils/utils");
// import { UserInstance } from '../models/userSchema';
const uuid_1 = require("uuid");
const productSchema_1 = require("../models/productSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = (0, uuid_1.v4)();
            const validUser = req.user;
            const { imageUrl } = req.body;
            const validateResult = utils_1.createProductSchema.validate(req.body, utils_1.option);
            if (validateResult.error) {
                return res.status(400).json({ Error: validateResult.error.details[0].message });
            }
            const product = yield productSchema_1.ProductInstance.findOne({
                where: {
                    imageUrl: imageUrl,
                },
            });
            if (!product) {
                const newProduct = yield productSchema_1.ProductInstance.create(Object.assign(Object.assign({ id: uuid }, req.body), { userId: validUser.id }));
                // return res.status(201).json({
                //   message: "Product created successfully",
                //   newProduct,
                // });
                return res.render('productAddedSuccess', { "title": "created" });
            }
            else {
                return res.status(400).json({
                    message: "Product already exists",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Cannot create product...",
            });
        }
    });
}
exports.createProduct = createProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            const validUserId = decoded.id;
            const id = req.params.id;
            const product = yield productSchema_1.ProductInstance.findOne({
                where: {
                    id: id,
                },
            });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            if (product.userId !== validUserId) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            yield product.destroy();
            // return res.status(200).json({
            //   message: 'Product deleted successfully',
            // });
            res.status(301).redirect('/users/manage');
            //   res.status(200).json({
            //     message: 'Product deleted successfully',
            // });
        }
        catch (error) {
            console.error(error); // Log the error for debugging purposes
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    });
}
exports.deleteProduct = deleteProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const validUser = req.user;
        // const { id } = req.params;
        const token = req.cookies.token;
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const validUserId = decoded.id;
        const id = req.params.id;
        const validateResult = utils_1.updateProductSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const product = yield productSchema_1.ProductInstance.findOne({
            where: {
                id: id,
                userId: validUserId
            }
        });
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            });
        }
        yield product.update(Object.assign({}, req.body));
        // return res.status(200).json({
        //   message: "Product updated successfully"
        // })
        res.status(301).redirect('/users/manage');
    });
}
exports.updateProduct = updateProduct;
function viewAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            const userId = decoded.id;
            const result = yield productSchema_1.ProductInstance.findAll();
            const products = result.map(product => product.dataValues);
            console.log(products);
            // return res.status(200).json({
            //   products: result
            // })
            return res.render('home', { "title": "home", products });
        }
        catch (error) {
            return res.status(500).json({
                message: "Cannot view products..."
            });
        }
    });
}
exports.viewAllProducts = viewAllProducts;
// export async function viewUserProducts(req: Request | any, res: Response) {
//   try {
//     const userId = req.params.id;
//     const products = await ProductInstance.findAll({
//       where: {
//         userId: userId,
//       },
//     });
//     if (!products || products.length === 0) {
//       return res.status(404).json({
//         message: "No products found for this user",
//       });
//     }
//     return res.status(200).json({
//       products,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Cannot view products...",
//     });
//   }
// }
