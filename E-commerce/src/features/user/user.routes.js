
// 1. Import express
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";


const userController= new UserController();

const UserRouter= express.Router();

//  all the paths to controller method
//  we are using the anonimius function (req,res)=>{userController.signUp(req,res), because in controler we have created the two instances of the classes
//  User model and userRepository so get the proper this and bound to perticular instance we have use the req and res anonimius function
UserRouter.post('/signup',(req,res,next)=>{userController.signUp(req,res,next)});
UserRouter.post('/signin',(req,res)=>{userController.signIn(req,res)});
UserRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next)
});
export default UserRouter;



// When you use a method like userController.signUp(req, res), this inside signUp refers to the userController instance,
// assuming it is invoked as an object method. But if you pass signUp directly as a callback without binding it properly,
//  the context of this might be lost, especially if the method is not directly invoked on userController.

// Example of Potential Problem
// Suppose you wrote:
// UserRouter.post('/signup', userController.signUp);
// In this scenario:

// userController.signUp is passed as a reference to the route handler.
// When Express calls userController.signUp, it does so without any knowledge of the userController instance.
// Consequently, the value of this inside signUp could become undefined or point to something other than userController.


// Ensuring Correct this Binding with req and res
// When you wrap the method call in an anonymous function like this:


// UserRouter.post('/signup', (req, res) => {
//     userController.signUp(req, res);});
// this Binding: The anonymous function ensures that userController.signUp is called explicitly on the userController instance. Inside signUp, this correctly refers to userController.
// req and res: These objects are simply passed as arguments to the signUp method. They don't directly bind this, but by calling the method within an anonymous function, you ensure that signUp is called as an instance method of userController, maintaining the correct this context.
// Using .bind()
// If you wanted to pass the method directly but still maintain the correct this context, you could use .bind():

// 
//
// UserRouter.post('/signup', userController.signUp.bind(userController));
// Here, bind(userController) explicitly sets the this value inside signUp to always refer to userController, regardless of how the method is invoked.