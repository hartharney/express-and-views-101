import { Request, Response } from 'express';
import { registerUserSchema, option, loginUserSchema } from '../Utils/utils';
import {userInstance } from '../models/userSchema';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ejs from 'ejs'
import { ProductInstance } from '../models/productSchema';

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


const jwtSecret = process.env.JWT_SECRET as string;

export const Register = async (req:Request, res:Response) => {

        try {
            
            // extract req.body data
            const { email, phoneNumber, fullName, gender, address, password} = req.body;
            const iduuid = uuidv4();
    
            //validate input
            const validateResult = registerUserSchema.validate(req.body, option);
    
            // if(validateResult.error){
                
            //     return res.status(400).json({Error :  validateResult.error.details[0].message})
            // }

            if (validateResult.error) {
                console.log(validateResult.error.details[0].message);
                const err = validateResult.error.details[0].message 
                return res.render('register', {
                //   error: validateResult.error.details[0].message, 
                err, "title" : "register"
                });
              }

            //encryption
    
            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
    
            //query db
            const user = await userInstance.findOne({
                where: {
                    email
                }
            })
    

            // create user if non-existent
            if(!user){
                
                const newUser = await userInstance.create({
                    id: iduuid,
                    fullName,
                    email,
                    phoneNumber,
                    gender,
                    address,
                    password: hashedPassword,
                });
                
                return res.render('successfulReg', { "title" : "Registration Successful"})
                // return res.status(301).redirect('/login')
            }else{
                return res.status(400).json({
                    message: "User already exists"
                })
            }
        } catch (error) {
            // return res.status(500).json({
            //     message: "Cannot register user..."
            // })
            return res.redirect("/welcome");
        }

}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const validateResult = loginUserSchema.validate(req.body, option);

        if (validateResult.error) {
            const err = validateResult.error.details[0].message;
            return res.render('login', {
                err,
                title: 'Login'
            });
        }

        const user = await userInstance.findOne({
            where: {
                email: email
            }
        }) as unknown as { [key: string]: string };

        if (!user) {
            return res.render('login', {
                err: 'User does not exist',
                title: 'Login'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {
                err: 'Incorrect email or password',
                title: 'Login'
            });
        }

        const { id } = user;
        const token = jwt.sign({ id }, jwtSecret, { expiresIn: '30m' });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });

        return res.status(301).redirect('/users/home');

    } catch (error) {
        console.error(error);
        return res.redirect("/welcome");
    }
}





export async function viewUserProducts(req: Request, res: Response) {
  try {
    const token = req.cookies.token;
    const decoded: any = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    const products = await ProductInstance.findAll({
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
  } catch (error) {
    // return res.status(500).json({
    //   message: "Cannot view products...",
    // });
    return res.redirect("/users/home")
  }
}



