import express, { Request, Response } from "express";
import { viewAllProducts } from "../Controllers/productController";
import { auth } from "../middlewares/auth";
import { ProductInstance } from "../models/productSchema";
const router = express.Router();

/* GET home page. */

router.get(
  "/",
  async function (req: Request, res: Response, next) {
    try {
      const result = await ProductInstance.findAll();

      const products = result.map((product) => product.dataValues);

      console.log(products);

      // return res.status(200).json({
      //   products: result
      // })

      return res.render("welcome", { title: "welcome", products });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot view products...",
      });
    }
  }
  // res.send('Hello World');
);
router.get(
  "/welcome",
  async function (req: Request, res: Response, next) {
    try {
      const result = await ProductInstance.findAll();

      const products = result.map((product) => product.dataValues);

      console.log(products);

      // return res.status(200).json({
      //   products: result
      // })

      return res.render("welcome", { title: "welcome", products });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot view products...",
      });
    }
  }
  // res.send('Hello World');
);

router.get("/register", function (req: Request, res: Response, next) {
  res.render("register", { title: "Register" });
  // res.send('Hello World');
});

router.get("/login", function (req: Request, res: Response, next) {
  res.render("login", { title: "Login" });
  // res.send('Hello World');
});

router.get("/logout", auth, function (req: Request, res: Response) {
  res.clearCookie("token");

  res.redirect("/login");
});

export default router;
