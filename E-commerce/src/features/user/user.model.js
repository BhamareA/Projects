import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this.id=id;
    }

    static getAll(){
        return users;
    }
}

// let users=[
//     {
//         id:'1',
//         name: 'Seller USer',
//         email: 'seller@ecom.com',
//         password:'PAssword1',
//         type: 'seller',
//     },
//     {
//         id:'2',
//         name: 'Customer USer',
//         email: 'customer@ecom.com',
//         password:'PAssword1',
//         type: 'customer',
//     },
// ]