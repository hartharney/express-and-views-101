import express, { Request, Response } from 'express';
const router = express.Router();
import { Register, Login, viewUserProducts} from '../Controllers/userController';
import { auth } from '../middlewares/auth';
import { viewAllProducts } from '../Controllers/productController';
import extractUserIdFromToken from '../middlewares/getID';


router.get('/home', viewAllProducts)
/* Onboard users */
router.post('/signup', Register);
router.post('/login', Login);
router.get('/manage/',auth,viewUserProducts)

/* GET users listing. */


export default router;
