import { query } from "express";
import ProductModel from "./product.module.js";
import ProductRepository from "./product.repository.js"

export default class ProductController{

    constructor(){
        this.productRepository= new ProductRepository();
    }
   async getAllProducts(req,res){
        try{
            const products= await this.productRepository.getAll();
            res.send(products);

        }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");

        }
    }

   async  addProduct(req,res){

        try{
        
       const {name,price,sizes,categories,desc}=req.body;
    
       const newProduct= new ProductModel(name,desc,parseFloat(price),req?.file?.filename,categories,sizes?.split(','))
     
        const createdRecord= await this.productRepository.add(newProduct);
        res.status(201).send(createdRecord);

        }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");

    }
    }

  async  rateProduct(req,res,next){
        
        try{
            console.log("body",req.body);
        const userID=req.userID;
        const productID= req.body.productID;
        const rating=req.body.rating;
        
       
      await  this.productRepository.rate(userID,productID,rating);
        return res.status(200).send("rating hasbeen added");
       
    }catch(err){
        console.log(err);
        console.log("Something went wrong");
        next(err)

    }
}

    

   async getOneProduct(req,res){
        const id= req.params.id;
        const product = await this.productRepository.get(id);
        if(!product){
            res.status(404).send("product not found");
        }else{
            return res.send(product);
        }
    }

     async filterProducts(req,res){
        try{

        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result = await this.productRepository.filter(minPrice,maxPrice,category);
        console.log(result);
        res.status(200).send(result);
            
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
    
        }
        
    }

    async averagePrice(req,res,next){
        try{

          const result =  await this.productRepository.averageProductPricePerCategory();
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
    
        }
    }
}