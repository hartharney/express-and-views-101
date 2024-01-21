"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../Controllers/userController");
const auth_1 = require("../middlewares/auth");
const productController_1 = require("../Controllers/productController");
router.get('/home', productController_1.viewAllProducts);
/* Onboard users */
router.post('/signup', userController_1.Register);
router.post('/login', userController_1.Login);
router.get('/manage/', auth_1.auth, userController_1.viewUserProducts);
/* GET users listing. */
exports.default = router;
