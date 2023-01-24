import express from "express";
import { RestaurantModel} from "../database/allmodels";
import { ValidateId, ValidateSearchString, } from "../../validation/common.validation";

const Router = express.Router();

//get all the restaurant details based on the city

Router.get("/", async (req,res)=>{
    try{
        const { city } = req.query;

        const restaurant = await RestaurantModel.find({city});
if(restaurants.length===0){
    return res.json({error:"no Restaurant found in city"});
}
        
return res.json({restaurant});
 } catch(error){
        return res.status(500).json({error: error.message});
    }
});

//get individual restaurant details based on the id

Router.get("/:_id", async (req,res)=>{
    try{
        const {_id}= req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant){
            return res .status(400).json({error:"Restarunt not found"});
        }
        return res.json({restaurants})
    } catch(error){
           return res.status(500).json({error: error.message});
       }
});

//get restaurants details based on search strings

Router.get("/search/:searchString", async (req,res)=>{
    try{
       const {searchString}= req.params;
       await ValidateSearchString(req.params);
       const restaurant = await RestaurantModel.find({
        name:{$regex: searchString, $option:"i"},

       });

       if(!restaurant.length===0){
        return res
        .status(400)
        .json({error:"no restaurant matched with ${searchString}"});
       }
       return res.json({restaurants});
    } catch(error){
           return res.status(500).json({error: error.message});
       }
});



export default Router;