import express, { Request, Response }from 'express'
import { createProduct, deleteProduct, updateProduct, viewAllProducts } from '../Controllers/productController'
import { auth } from '../middlewares/auth'

const router = express.Router();



router.get('/addproduct',auth, (req : Request, res: Response) => {
    res.render('addProduct', { "title" : 'add products'})
})



router.post('/create',auth, createProduct)
router.get('/delete/:id',auth, deleteProduct)
router.post('/update/:id',auth, updateProduct)

// router.get('/view', auth, viewAllProducts)


export default router;