// import { Request, Response } from 'express';
// import { option, createProductSchema, updateProductSchema } from '../Utils/utils';
// // import { UserInstance } from '../models/userSchema';
// import { v4 as uuidv4 } from 'uuid';
// import { ProductInstance } from '../models/productSchema';

// export async function createProduct(req: Request | any, res: Response) {
//   try {
//     const uuid = uuidv4();
//     const validUser = req.user;
//     const { imageUrl } = req.body;

//     const validateResult = createProductSchema.validate(req.body, option);

//     if (validateResult.error) {
//       return res.status(400).json({ Error: validateResult.error.details[0].message });
//     }

//     const product = await ProductInstance.findOne({
//       where: {
//         imageUrl: imageUrl,
        
//       },
//     });

//     if (!product) {
//       const newProduct = await ProductInstance.create({
//         id: uuid,
//         ...req.body,
//         userId: validUser.id 
//       });

//       return res.status(201).json({
//         message: "Product created successfully",
//         newProduct,
//       });
//     } else {
//       return res.status(400).json({
//         message: "Product already exists",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "Cannot create product...",
//     });
//   }
// }


// export async function deleteProduct(req: Request | any, res: Response) {
//   try {
//     const validUser = req.user;

//     const { id } = req.params;

//     const product = await ProductInstance.findOne({
//       where : {
//         id : id
//       }
//     })

//     if(!product){
//       return res.status(400).json({
//         message: "Product not found"
//       })
//     }



//     if(product.userId !== validUser.id){
//       return res.status(401).json({
//         message: "Unauthorized"
//       })
//     }

//     await product.destroy();

//     return res.status(200).json({
//       message: "Product deleted successfully"
//     })


//   } catch (error) {
//     return res.status(500).json({
//       message: "Cannot create product...",
//     });
//   }
// }


// export async function updateProduct(req:Request | any, res:Response){

//   const validUser = req.user;
//   const { id } = req.params;
//   const { price, countInStock } =  req.body;
  
//   const validateResult = updateProductSchema.validate(req.body, option);

//   if (validateResult.error) {
//     return res.status(400).json({ Error: validateResult.error.details[0].message });
//   }

 

//   const product = await ProductInstance.findOne({
//     where: {
//       id: id,
//       userId: validUser.id
//     }
//   })

//   if(!product){
//     return res.status(400).json({
//       message: "Product not found"
//     })
//   }

//   await product.update({
//     price,
//     countInStock
//   })

//   return res.status(200).json({
//     message: "Product updated successfully"
//   })


// }

// export async function viewAllProducts(req: Request, res: Response){
//   try {
//     const products = await ProductInstance.findAndCountAll({
//       include: {
//         all: true
//       }
//     })

//     return res.status(200).json({
//       count : products.count,
//       products: products.rows
//     })
//   } catch (error) {
//     return res.status(500).json({
//       message: "Cannot view products..."
//     })
//   }
// }

// export async function viewUserProducts(req: Request | any, res: Response) {
//   try {


//     const validUser = req.user;
//     const products = await ProductInstance.findAll({
//       where: {
//         userId: validUser.id, 
//       },
//     });

//     if(!products){
//       return res.status(400).json({
//         message: "No product found"
//       })
//     }

//     return res.status(200).json({
//       products
//     })

//   } catch (error) {
//     return res.status(500).json({
//       message: "Cannot view products..."
//     })
//   }
// }

import { Request, Response } from 'express';
import { option, createProductSchema, updateProductSchema } from '../Utils/utils';
// import { UserInstance } from '../models/userSchema';
import { v4 as uuidv4 } from 'uuid';
import { ProductInstance } from '../models/productSchema';
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET as string;

export async function createProduct(req: Request | any, res: Response) {
  try {
    const uuid = uuidv4();
    const validUser = req.user;
    const { imageUrl } = req.body;

    const validateResult = createProductSchema.validate(req.body, option);

    if (validateResult.error) {
      return res.status(400).json({ Error: validateResult.error.details[0].message });
    }

    const product = await ProductInstance.findOne({
      where: {
        imageUrl: imageUrl,
        
      },
    });

    if (!product) {
      const newProduct = await ProductInstance.create({
        id: uuid,
        ...req.body,
        userId: validUser.id 
      });

      // return res.status(201).json({
      //   message: "Product created successfully",
      //   newProduct,
      // });
      return res.render('productAddedSuccess', {"title": "created"});
    } else {
      return res.status(400).json({
        message: "Product already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Cannot create product...",
    });
  }
}



export async function deleteProduct(req: Request, res: Response) {
  try {
    const token = req.cookies.token;
    const decoded: any = jwt.verify(token, jwtSecret);
    const validUserId = decoded.id;

    const id = req.params.id;

    const product = await ProductInstance.findOne({
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

    await product.destroy();


    // return res.status(200).json({
    //   message: 'Product deleted successfully',
    // });


    res.status(301).redirect('/users/manage');
  //   res.status(200).json({
  //     message: 'Product deleted successfully',
  // });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}



export async function updateProduct(req:Request | any, res:Response){

  // const validUser = req.user;
  // const { id } = req.params;

  const token = req.cookies.token;
  const decoded: any = jwt.verify(token, jwtSecret);
  const validUserId = decoded.id;

  const id = req.params.id

  
  const validateResult = updateProductSchema.validate(req.body, option);

  if (validateResult.error) {
    return res.status(400).json({ Error: validateResult.error.details[0].message });
  }


  const product = await ProductInstance.findOne({
    where: {
      id: id,
      userId: validUserId
    }
  })

  if(!product){
    return res.status(400).json({
      message: "Product not found"
    })
  }

  await product.update({
    ...req.body
  })

  // return res.status(200).json({
  //   message: "Product updated successfully"
  // })


  res.status(301).redirect('/users/manage');
}

export async function viewAllProducts(req: Request, res: Response){
  try {

       const token = req.cookies.token;
    const decoded: any = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    const result = await ProductInstance.findAll();

    const products = result.map(product => product.dataValues);
 
    console.log(products)

    // return res.status(200).json({
    //   products: result
    // })

    return res.render('home', { "title" : "home", products } )
  } catch (error) {
    return res.status(500).json({
      message: "Cannot view products..."
    })
  }
}

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
