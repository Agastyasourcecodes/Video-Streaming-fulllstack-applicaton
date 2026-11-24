const asyncHandler=(requestHandler)=>{
     (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(error))
     }
}


export {asyncHandler}



// const asyncHandler=(fn)=>async (req,res,next)=>{
 
//     try{

//     }
//       catch(error){
//         res.send(error.code || 500).json({
//             success:false,
//             message:err.message
//         })
//       }

// }