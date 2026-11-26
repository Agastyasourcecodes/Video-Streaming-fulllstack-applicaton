import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadONCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser=asyncHandler(async(req,res)=>{
    
    //take username and email
    //pass via middleware and check if data is valid
    //hash pass with bycrpt then store in db
    //generate jwt token 
    //send success response

    //get user details from frontend
    const {fullName,email,username,password}=req.body
    // console.log("email",email);
   

    //if any field empty throw api error (in utils) 
    if(
        [fullName,email,username,password].some((field)=>{
           return field?.trim()===""
        })
    ){

        throw new ApiError(400,"fullname is required")

    }

    //checking if user already exists using mongo functions
      const  exisitedUser=await User.findOne({
          $or:[{ username },{ email }]

        })
        if(exisitedUser){
            throw new ApiError(409,"user with email or username already exists")

        }

       // fetch check avatar and cover img
       const avatarLocalPath=req.files?.avatar?.[0]?.path ;
     
       let coverImageLocalPath;
       if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path

       }

    //    const coverImageLocalPath=req.files?.coverImage?.[0]?.path;
     if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");

     }
   const avatar=await uploadONCloudinary(avatarLocalPath)
   const coverImage=await uploadONCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400,"Avatar file is required")
   }
   const user=await User.create({
    fullName,
    avatar: avatar.url,
    coverImage:coverImage?.url|| "", //coverimg h to return wrna empty
    email,
    password,
    username:username.toLowerCase()


   })
   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,"user not found")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
   )

})


export {registerUser}