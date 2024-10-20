import "./env.js"
import express from 'express';
import swagger from 'swagger-ui-express';


import bodyParser from 'body-parser';
import multer from 'multer';
import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middleware/basicAuth.middleware.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import cartRouter from './src/features/cart/cartitem.routes.js';
import cors from "cors";
import {connectToMongoDB} from './src/config/mongodb.js';

import apiDocs from './swagger.json' assert {type: 'json'};
import loggerMiddleware from './src/middleware/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.router.js";

// 2. Create server
const server = express();

//  load all the environment variables in application


// CORS policy configuration

var corsOption = {
    origin:'http://localhost:5500',
    allowedHeaders: " *"
}


server.use(cors(corsOption));
// server.use(cors());

//  OR

// server.use((req,res)=>{
//     res.header("Access-Control-Allow-Origin","http://localhost:5500");  // for specfic client
//     //   res.header("Access-Control-Allow-Origin"," * ");    access for all clients
//     res.header("Access-Control-Allow-Headers","*"); // or mention specifi headers
//     res.header("Access-Control-Allow-Methods","*");  
//     // return ok for preflight requst
//     if(req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
    
//     next()
// })

// const upload = multer();
// Middleware for parsing JSON and URL-encoded data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing multipart/form-data
// server.use(upload.none());
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);
// For all requests related to product, redirect to product routes
server.use('/api/users',UserRouter);
server.use('/api/orders', jwtAuth,orderRouter);
server.use('/api/products', jwtAuth, ProductRouter);
server.use('/api/cartItems',jwtAuth,cartRouter)
server.use('/api/likes', jwtAuth, likeRouter);

// 3. Default request handler
server.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APIS');
});
//  Error handler middleware
server.use((err, req, res, next)=>{
  console.log(err);

  if(err instanceof mongoose.Error.ValidationError){
    console.log(err);
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }

  // server errors.
  res.status(500).send('Something went wrong, please try later');
  // Optionally, you can log the error for further debugging
  console.error(err);
});
//  4. Middleware to handle 404 request  , keep it at thr end necause if we place at top then it won't abel to go through other apis

server.use((req,res)=>{
    res.status(404).send("API not Found.")
})
// Listen and port
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
    // connectToMongoDB();
    connectUsingMongoose();
});