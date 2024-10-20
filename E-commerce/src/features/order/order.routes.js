
import express from "express";
import OrderController from "./oreder.controller.js";

const orderRouter=express.Router();

const orderController= new OrderController();

orderRouter.post('/',(req,res,next)=>{
    orderController.placeOrder(req,res,next);
})


export default orderRouter;