const cloudinary = require('cloudinary').v2;  // Cloudinary in require format
const fs = require('fs');  // File system module in require format

// cloudinary uploads the files from server to cloudinary server..


cloudinary.config({ 
      // Click 'View API Keys' above to copy your API secret
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_key
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    // api_key: process.env.CLOUDINARY_API_KEY, 
    // api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary..
        const response = await cloudinary.uploader.upload(localFilePath, 
            {
            resource_type: "raw",
            
        })
        //file has been upload successfully..
        console.log("file is uploaded on cloudinary !!", response.url);
        
        fs.unlinkSync(localFilePath)
        return response.url;
    }
    catch(error){
         fs.unlinkSync(localFilePath)  //remove the local saved temporary file as the upload operation got failed
         return null;
    }
}

module.exports.uploadOnCloudinary = uploadOnCloudinary;
