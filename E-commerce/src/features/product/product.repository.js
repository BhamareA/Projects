import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import {getDB} from "../../config/mongodb.js"
import { productSchema } from "./product.schema.js";
import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";


const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Reviews", reviewSchema);
const CategoryModel=mongoose.model("Category",categorySchema)
class ProductRepository{

    constructor(){
        this.collection="products";
    }

 async add(ProductData){
    try{
        //  1. get the db
    // const db =getDB();

    // const collection =db.collection(this.collection);
    // await collection.insertOne(newProduct);

    // return newProduct;
    ProductData.categories=ProductData.category.split(',').map(e=>e.trim());
    console.log(ProductData);

    const newProduct = new ProductModel(ProductData);
    const savedProduct= await newProduct.save();

    // update the product
    await CategoryModel.updateMany(
        {_id:{$in: ProductData.categories}},
        {$push:{products: new ObjectId(savedProduct._id)}}
    )


}catch(err){
console.log(err);
throw new ApplicationError("Something went wrong with the database");
}

}

 async getAll(){
    try{
    const db = getDB();
    const collection=db.collection(this.collection);
    return await collection.find().toArray();
    }
    catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the database");
    }
 
}

 async get(id){
    try{
        const db= getDB();
        const collection=db.collection(this.collection);
        return await collection.findOne({_id: new ObjectId(id)})
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the database");
    } 
}

async filter(minPrice,maxPrice,category){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);
        let filterExpression={};
        if(minPrice){
            filterExpression.price ={$gte: parseFloat(minPrice)}
        }
        if(maxPrice){
            filterExpression.price ={$lte: parseFloat(maxPrice)}
        }
        if(category){
            filterExpression.price ={$eq: category}
        }
        return await collection.find(filterExpression).toArray();



    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the database");
    } 
        
}

//  async rate(userID, productID, rating){

//     try{
//         const db= getDB();
//         const collection =db.collection(this.collection);
//         //  1.find the product
//         const product = await collection.findOne({_id:new ObjectId(productID)});

//         //  2 find the rating
//         const userRating = product?.ratings?.find(r=>r.userID==userID);
//         if(userRating){
//             await collection.updateOne({
//                 _id:new ObjectId(productID), "ratings.userID": new ObjectId(userID)
//             },{
//                 $set:{"ratings.$.rating":rating}
//             })

//         }else{

//        await collection.updateOne({_id:new ObjectId(productID)},
//         {
//             $push: {ratings: {userID:new ObjectId(userID), rating}}
//         })
//     }

//     }catch(err){
//         console.log(err);
//         throw new ApplicationError("Something went wrong with the database");
//     } 
        
// }

async rate(userID, productID, rating){

   try{
    // console.log(" repository", rating)
    // const db =getDB();
    // const collection=db.collection(this.collection);
    // //  1. Removes existing entry
    // await collection.updateOne({
        
    //         _id: new ObjectId(productID)
        
    // },{
    //     $pull:{ratings:{userID: new ObjectId(userID)}}
    // })

    // //  2. Add new entry
    // await collection.updateOne({_id:new ObjectId(productID)},
    
    //     {
    //         $push: {ratings: {userID:new ObjectId(userID), rating}}
    //     })

//    according to mongoose one to many exaple 
//  1. check if product exists

  const productToUpdate = await ProductModel.findById(productID);
  if(!productToUpdate){
    throw new Error("product not found")
  }
//   2 get existing review

    const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
    console.log(userReview);
    if(userReview){
    userReview.rating=rating;
    await userReview.save();
  }else{
    const newReview = new ReviewModel({product: new ObjectId(productID), user: new ObjectId(userID)});
  }
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the database");
    } 
        
}
async averageProductPricePerCategory(){
    try{
        const db= getDB();
      return  await db.collection(this.collection).aggregate([
            //  stage 1 vaerge price per category
          {  $group:{ _id:"category", averagePrice:{$avg:"price"}

            }}
        ]).toArray();

 

    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");

    }
}

}

export default ProductRepository