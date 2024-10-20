import CartItemsRepository from "./cartitem.repository.js";
import CartItemModel from "./cartitem.model.js";

export class CartItemsController{
    constructor(){
        this.cartItemsRepository = new CartItemsRepository();

    }
   async add(req,res){

    try{
        const {productID,quantity}=req.body;
        const userID= req.userID;
        // console.log(productID,userID,quantity);
       await  this.cartItemsRepository.add(productID,userID,quantity);
        res.status(201).send('Cart is updated');

    }catch(err){
            console.log(err)
            return res.status(200).send("something went wrong");
        
    }
    
    }
    
   async get(req,res){
    try{
        const userID= req.userID;
       
        const items=await this.cartItemsRepository.get(userID);
        console.log(items)
        return res.status(200).send(items);
     }catch(err){
        console.log(err)
        return res.status(200).send("something went wrong");
    
}
    }


    // update(req,res){
    //     const userID= req.userID;
    //     const productID=req.productID;
    //     const updatedquantity=req.quantity;
    //     const error= this.cartItemsRepository.update(productID,userID,updatedquantity);
    //     if(error){
    //         res.status(400).send(error);
    //     }else{
    //         res.status(201).send("Product Updated successfully");
    //     }
    // }

    async delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        const isDeleted = await this.cartItemsRepository.delete(userID, cartItemID        );
        if (!isDeleted) {
            return res.status(404).send("Item not found");
        }
        return res
        .status(200)
        .send('Cart item is removed');
    }

}