import { Router,Request,Response,NextFunction } from "express";
import { body,check,oneOf,validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updated } from "./handlers/update";
import { createUpdatePoint, deleteUPoint, getUpdatePoints, oneUpdatePoint, updateUpPoint } from "./handlers/updatePoint";
const router = Router();

/**
 * Product
 */
router.get('/product',getProducts)
router.get('/product/:id',getOneProduct)
//req.body which is an object should have a field on it called name
router.put('/product/:id',body('name').isString(),handleInputErrors,(req:Request,res:Response)=>{
   
})
router.post('/product/',
    [
        body('name')
        .notEmpty()
        .withMessage('name is required'),
    ]

,handleInputErrors,createProduct)
router.delete('/product/:id',deleteProduct)
/**
 * Update
 */
router.get('/update',getUpdates)
router.get('/update/:id',getOneUpdate)
router.put('/update/:id',
    [   body('title').optional(),
        body('body').optional(),
        oneOf([
        check('status').equals('IN_PROGRESS'), 
        check('status').equals('SHIPPED'), 
        check('status').equals('DEPRECATED')
        ]),
        body('version').optional().isString(),
        
    ],
    handleInputErrors
    ,updated)
router.post('/update',
    [   body('title').exists().isString(),
        body('body').exists().isString(),
       body('productID').exists().isString()
    ]
    ,handleInputErrors
    ,createUpdate)
router.delete('/update/:id',deleteUpdate)

/**
 * Update Points
 */
router.get('/updatepoint',getUpdatePoints)
router.get('/updatepoint/:id',oneUpdatePoint)
router.put('/updatepoint/:id',
    [   
        body('name').optional().isString(),
        body('description').optional().isString(), 
    ]
    ,handleInputErrors,updateUpPoint
)
router.post('/updatepoint',
    [
        body('name').exists().isString(),
        body('description').exists().isString(),
        body('updateID').exists().isString()   
    ],
    handleInputErrors
    ,createUpdatePoint)
router.delete('/updatepoint/:id',handleInputErrors,deleteUPoint)
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if(err.type ==='auth'){
    res.status(401).json({message:"unauthorized"})
  }else if (err.type = 'input'){
    res.status(400).json({message:"invalid input"})
  }else{
    res.status(500).json({message:"oops that's on us"})
  }
  console.error(err); // show full error in console
  res.status(500).json({ message: "There was an error!" });
});

//importing The application router 

export default router