import UserModel from "../user/user.model.js";
import {ApplicationError} from "../../error-handler/applicationError.js"
export default class ProductModel{
    constructor(name,desc,price,imageUrl, category,sizes,id){
        this._id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;

    }

   
    static rateProduct(userID,productID,rating){
      // 1. validate user and product

      const user= UserModel.getAll().find(u=>u.id==userID);
      if(! user){
        throw new ApplicationError("User not Found",404);
        // creating instance of error class and throw is used to throw the error; 
      }

      const product=products.find(p=> p.id==productID);
      if(!product){
        throw new ApplicationError("Product not found",400);
      }

      //  2. check if there are any ratings

      if(!product.ratings){
        product.ratings =[];
        product.ratings.push({
          userID:userID,
          rating:rating,
        });
      }else{
        // 3. check if user rating is already available 
        const existingRatingIndex = product.ratings.findIndex(r=> r.userID==userID);
        if(existingRatingIndex>=0){
          product.ratings[existingRatingIndex]={
            userID:userID,
            rating:rating,
          }
        }else{
          // 4. if no existing rating, then add new rating
          product.ratings.push({
            userId:userID,
            rating:rating,
          }) ;
        }
      }
    }
}

