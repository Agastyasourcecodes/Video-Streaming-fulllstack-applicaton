// import {v2 as cloudinary} from "cloudinary"

// import fs from "fs";
// //nodejs file system to read write etc files

//  cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });

//     //uploading on cloudinary

//     const uploadONCloudinary=async (localFilePath)=>{
//         try{
//             if(!localFilePath) return null;
//             console.log("No local file path")
//           const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//           })
//           //file succesfully uploaded
//           console.log("file is uploaded on cloudinary",
//             response.url
//           );
//           return response;
         
//         }
//         catch(error){
//           fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation failed
//           return null;
//         }
//     }
//     export {uploadONCloudinary}


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary
const uploadONCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No local file path");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // console.log("File uploaded successfully:", response.url);
         fs.unlinkSync(localFilePath)
        return response;
    }
    catch (error) {
        console.log("Cloudinary upload failed:", error);
        return null;
    }
    finally {
        // Delete temporary local file after upload attempt
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
    }
};

export { uploadONCloudinary };
