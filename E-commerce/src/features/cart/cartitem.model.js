//  things we required productid, userid, quantity

export default class CartItemModel{
    constructor(productID,userID,quantity,id){
        this.productID =  productID;
        this.userID=userID;
        this.quantity=quantity;
        this._id=id;
    }

   static add(productID,userID,quantity){
       const cartItem=new CartItemModel(productID,userID,quantity);
       cartItem.id= cartItems.length+1;
       cartItems.push(cartItem);
       return cartItem;

    }

    static get(userID){
        console.log(userID);
        return cartItems.filter(i=>i.userID==userID);
    }

    static update(productID,userID,updatedquantity){
        const existingProductID =cartItems.find(u=>u.productID==productID);
        const existingUserID=cartItems.find(u=>u.userID==userID);
        if(existingProductID && existingUserID){
            cartItems.quantity==updatedquantity;
            return cartItems;
        }else{
            cartItems.push({
                productID:productID,
                userID:userID,
                quantity:updatedquantity,
            });
        }
    }

    static delete(cartItemID,userID){
        const cartItemIndex=cartItems.findIndex(i=>i.id==cartItemID && i.userID== userID);
        if(cartItemIndex== -1){
            return "PRoduct not found"
        }else{
            cartItems.splice(cartItemIndex,1);

        }

    }
}

var cartItems =[
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,2)

];