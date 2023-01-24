import express from "express";

import {UserModel} from "../../database/allmodels";
import passport from "passport";
const Router =express.Router();

//get authorised user data

Router.get("/",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const{email,fullname,phoneNumber,address} =req.user;
        return res.json({user:{email,fullname,phoneNumber,address}});

    }catch(error){
        return res.status(500).json({error:error.message});
    }
});


//get user data
Router.get("/:_id",async(req,res)=>{
    try{
       const {_id}=req.params;
       const getUser = await UserModel.findById(_id);
       
       if(!getUser){
        return res.status(400).json({error: "user not found by this id"});

       }
       const {fullName}= getUser;
       return res.json({user:{fullName}});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

//update user data by their Id
Router.put("/update/:_id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
try{
    const{_id}=req.params;
    const{userData} = req.body;

    userData.password = undefined;

    const updateUserData = await UserModel.findById(_id,
        {
        $set: userData,
    },{
        new:true,

    });
    return res.json({user:updateUserData});
}catch(error){
    return res.status(500).json({error:error.message});
}
});

export default Router;