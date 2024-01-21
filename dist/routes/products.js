"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../Controllers/productController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/addproduct', auth_1.auth, (req, res) => {
    res.render('addProduct', { "title": 'add products' });
});
router.post('/create', auth_1.auth, productController_1.createProduct);
router.get('/delete/:id', auth_1.auth, productController_1.deleteProduct);
router.post('/update/:id', auth_1.auth, productController_1.updateProduct);
// router.get('/view', auth, viewAllProducts)
exports.default = router;
