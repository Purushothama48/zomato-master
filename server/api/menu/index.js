import express from "express";
import { MenuModel } from "../../database/menu";
import { ValidateId } from "../../validation/common.validation";


const Router = express.Router();

//get all list of menu based on restaurant id

Router.post("/list/:_id",async(req,res)=>{
    try{
        const{_id}=req.params;
        await ValidateId(req.params);

        const menus = await MenuModel.findById(_id);
        if(!menus){
            return res.status(404).json({error:"no menu present for this restaurant"});

        }
        return res.json({menus});

    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

//get all new images with their restaurant ids

Router.post("/image/:_id",async(req,res)=>{
try{
    const {_id}=req.params;
    const menuImages = await ImageModel.findId(_id);
    if(!menuImages)
    return res.status(404).json({message:"no menu images found here"});
    return res.json({menuImages});
}catch(error){
    return res.status(500).json({error:error.message});
}
});

 export default Router;


