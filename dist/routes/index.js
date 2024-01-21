"use strict";
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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const productSchema_1 = require("../models/productSchema");
const router = express_1.default.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield productSchema_1.ProductInstance.findAll();
            const products = result.map((product) => product.dataValues);
            console.log(products);
            // return res.status(200).json({
            //   products: result
            // })
            return res.render("welcome", { title: "welcome", products });
        }
        catch (error) {
            return res.status(500).json({
                message: "Cannot view products...",
            });
        }
    });
}
// res.send('Hello World');
);
router.get("/welcome", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield productSchema_1.ProductInstance.findAll();
            const products = result.map((product) => product.dataValues);
            console.log(products);
            // return res.status(200).json({
            //   products: result
            // })
            return res.render("welcome", { title: "welcome", products });
        }
        catch (error) {
            return res.status(500).json({
                message: "Cannot view products...",
            });
        }
    });
}
// res.send('Hello World');
);
router.get("/register", function (req, res, next) {
    res.render("register", { title: "Register" });
    // res.send('Hello World');
});
router.get("/login", function (req, res, next) {
    res.render("login", { title: "Login" });
    // res.send('Hello World');
});
router.get("/logout", auth_1.auth, function (req, res) {
    res.clearCookie("token");
    res.redirect("/login");
});
exports.default = router;
