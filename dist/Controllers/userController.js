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
exports.viewUserProducts = exports.Login = exports.Register = void 0;
const utils_1 = require("../Utils/utils");
const userSchema_1 = require("../models/userSchema");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productSchema_1 = require("../models/productSchema");
// const jwtSecret = process.env.JWT_SECRET as string;
// export const Register = async (req:Request, res:Response) => {
//         try {
//             // extract req.body data
//             const { email, phoneNumber, fullName, gender, address, password} = req.body;
//             const iduuid = uuidv4();
//             //validate input
//             const validateResult = registerUserSchema.validate(req.body, option);
//             if(validateResult.error){
//                 return res.status(400).json({Error :  validateResult.error.details[0].message})
//             }
//             //encryption
//             const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
//             //query db
//             const user = await userInstance.findOne({
//                 where: {
//                     email
//                 }
//             })
//             // create user if non-existent
//             if(!user){
//                 const newUser = await userInstance.create({
//                     id: iduuid,
//                     fullName,
//                     email,
//                     phoneNumber,
//                     gender,
//                     address,
//                     password: hashedPassword,
//                 });
//                 res.status(201).json({
//                     message: "User registered successfully",
//                     newUser
//                 })
//                 // return res.redirect('/welcome')
//             }else{
//                 return res.status(400).json({
//                     message: "User already exists"
//                 })
//             }
//         } catch (error) {
//             return res.status(500).json({
//                 message: "Cannot register user..."
//             })
//         }
// }
// export const Login = async (req:Request,res:Response) => {
//     try {
//         const { email, password } = req.body;
//         const validateResult = loginUserSchema.validate(req.body, option);
//         if(validateResult.error){
//             return res.status(400).json({ error: validateResult.error.details[0].message });
//         }
//         const user = await userInstance.findOne({
//             where: {
//                 email: email
//             }
//         }) as unknown as {[key:string] : string};
//         if (!user) {
//             return res.status(400).json({
//               message: "User does not exist"
//             });
//           }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             return res.status(400).json({
//                 message: "Incorrect email or password"
//             })
//         }
//         const { id } = user;
//         const token = jwt.sign({ id }, jwtSecret, { expiresIn: '30m' });
//         res.cookie('token', token,{httpOnly: true, maxAge: 30 * 60 * 1000})
//         return res.status(200).json({
//             message: "User logged in successfully",
//             user: user,
//             token : token
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Cannot login user..."
//         })
//     }
// }
const jwtSecret = process.env.JWT_SECRET;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract req.body data
        const { email, phoneNumber, fullName, gender, address, password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //validate input
        const validateResult = utils_1.registerUserSchema.validate(req.body, utils_1.option);
        // if(validateResult.error){
        //     return res.status(400).json({Error :  validateResult.error.details[0].message})
        // }
        if (validateResult.error) {
            console.log(validateResult.error.details[0].message);
            const err = validateResult.error.details[0].message;
            return res.render('register', {
                //   error: validateResult.error.details[0].message, 
                err, "title": "register"
            });
        }
        //encryption
        const hashedPassword = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt());
        //query db
        const user = yield userSchema_1.userInstance.findOne({
            where: {
                email
            }
        });
        // create user if non-existent
        if (!user) {
            const newUser = yield userSchema_1.userInstance.create({
                id: iduuid,
                fullName,
                email,
                phoneNumber,
                gender,
                address,
                password: hashedPassword,
            });
            return res.render('successfulReg', { "title": "Registration Successful" });
            // return res.status(301).redirect('/login')
        }
        else {
            return res.status(400).json({
                message: "User already exists"
            });
        }
    }
    catch (error) {
        // return res.status(500).json({
        //     message: "Cannot register user..."
        // })
        return res.redirect("/welcome");
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validateResult = utils_1.loginUserSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            const err = validateResult.error.details[0].message;
            return res.render('login', {
                err,
                title: 'Login'
            });
        }
        const user = yield userSchema_1.userInstance.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.render('login', {
                err: 'User does not exist',
                title: 'Login'
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {
                err: 'Incorrect email or password',
                title: 'Login'
            });
        }
        const { id } = user;
        const token = jsonwebtoken_1.default.sign({ id }, jwtSecret, { expiresIn: '30m' });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
        return res.status(301).redirect('/users/home');
    }
    catch (error) {
        console.error(error);
        return res.redirect("/welcome");
    }
});
exports.Login = Login;
function viewUserProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            const userId = decoded.id;
            const products = yield productSchema_1.ProductInstance.findAll({
                where: {
                    userId: userId,
                },
            });
            if (!products || products.length === 0) {
                //   return res.status(404).json({
                //     message: "No products found for this user",
                //   });
                res.render('myProducts', { "title": "manage", products });
            }
            res.render('myProducts', { "title": "manage", products });
        }
        catch (error) {
            // return res.status(500).json({
            //   message: "Cannot view products...",
            // });
            return res.redirect("/users/home");
        }
    });
}
exports.viewUserProducts = viewUserProducts;
