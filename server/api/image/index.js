import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allmodels";

import {s3Upload} from "../../utils/s3"

const Router = express .Router();

//config multer
const storage = multer.memoryStorage();
const upload = multer({storage});


//get image details based on id
Router .get("/:_id",async(req,res)=>{
    try{
        const image = await ImageModel.findById(req.params._id);
        return res.json({image})
    }catch(error){
        return res.status(500).json({error:error.message})

    }
});


//upload given image to s3 n db
Router .get("/",upload.single("file"),async(req,res)=>{
    try{
        const file = req.file
        const backetOption = {
            Bucket : "zomato-clone",
            Key: file.originalname,
            Body:file.buffer,
            ContentType:file.mimetype,
            ACL:"public-read",

        }
        const uploadImage = await s3Upload(bucketOption);
        
        //uploading imgs to db
        const dbUpload = await ImageModel.create({
            image:[
            {  
                Location: uploadImage.Location,

        },
    ],
        });
      
        return res.status(200).json({uploadImage});
    }catch(error){
        return res.status(500).json({error:error.message})

    }
});

export default Router;