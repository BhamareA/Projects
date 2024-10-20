//  manage routes/paths to productController

// 1. Import express
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middleware/fileupload.middleware.js"
const productController= new ProductController();
// Initialize express router

const ProductRouter= express.Router();

//  all the paths to controller method
ProductRouter.post('/rate',(req,res,next)=>{productController.rateProduct(req,res,next)});
ProductRouter.get('/filter',(req,res)=>{productController.filterProducts(req,res)});
ProductRouter.get('/',(req,res)=>{productController.getAllProducts(req,res)});
ProductRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});
// ProductRouter.post('/',productController.addProduct);

ProductRouter.get('/averagePrice',(req,res,next)=>{
    productController.averagePrice(req,res)
});

ProductRouter.get('/:id',(req,res)=>{productController.getOneProduct(req,res)});
// localhost:3000/api/products/filter?minPrice=10&maxPrice=20&cateogory=cateogory1   this is type of query parameters


export default ProductRouter;