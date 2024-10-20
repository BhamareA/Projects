
import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'types'
    },
    types:{
        type: String,
        enum:["Product", "Category"]

    }
// miidleware in mongoose for pre and post operation
}).pre('save', (next)=>{
    console.log("New Like coming in");
    next();
}).post('save', (doc)=>{
    console.log("Like is Saved");
    console.log(doc);
}).pre('find',(next)=>{
    console.log("Retriving like");
    next();
}).post('find',(doc)=>{
    console.log("Find is completed");
    console.log(doc);
})