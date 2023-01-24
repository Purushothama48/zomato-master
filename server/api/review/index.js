import express from "express";
import passport from "passport";

import { ReviewModel } from "../../database/allmodels";

const Router = express.Router();

//get all reviews for a perticular restaurant id
Router.get("/:resId",async(req,res)=>{

    try{
const{resId}= req.params;
const reviews = await ReviewModel.find({restaurants: resId}).sort({
    createdAt: -1,
})
return res.json({reviews});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

//add new food/restaurant review and rating

Router.post("/new",passport.authenticate("jwt",{session:false}),async(req,res)=>{
try{
const {_id}= req.user;
const{reviewData}= req.body
const newReview= await ReviewModel.create({...reviewData, user: _id});
return res.json({newReview});
}catch(error){
    return res.status(500).json({error:error.message});
}



});
   
  
//delete a review
Router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
try{
const{user}=req;
const{id}= req.params;
const data= await ReviewModel.findOneAndDelete({
    _id: id,
    user: user._id
});
if(!data)return res.json({message: "Review was not deleted"});
return res.json({message:"successfully deleted a review",data});
}catch(error){
    return res.status(500).json({error:error.message});
}

   
});
   
   
   
   
    export default Router;