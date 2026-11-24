import dotenv from "dotenv"
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
import {app} from "./app.js"
dotenv.config();
 connectDB()


.then(()=>{
      
    app.on("error",(error)=>{
        console.log("Express server error in listening",error);
        throw error
    })
  
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port : ${process.env.PORT}`);

    })
})
.catch((err)=>{
    console.log("Mongo db connection failed",err);
   process.exit(1);
})













// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js"

// // import express from "express"
// const app=express()

// (async ()=>{

//     try{
//         //await used bcs db always far away so it can take time to load
//       await mongoose.connect(`${process.env.MONGODB_URI}`)
      
//       //if mongo not connect
//       app.opn("error",(error)=>{
//         console.log("express cant connect to mongoose",error);
//         throw error
//       })

//       app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.env.PORT}`)
//       })

//     }
//     catch(error){
//         console.error("ERROR",error)
//         throw err
//     }

// })()