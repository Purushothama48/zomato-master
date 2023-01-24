import express from "express";

import { Usermodel } from "../../database/allmodels";
 
import { validateSignin, validateSignup } from "../../validation/auth.validation";

const Router =  express.Router();

 Router.post("/signup",async(req,res)=>{
    try{
        await validateSignup(req.body.credentials);
        await UserModel.findByEmailANDPhone(req.body.credentials);
      const newUser = await Usermodel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token,status: "sucess"});

    }catch(error){
        return res.status(500).json({error:error.message})
    }
 });

 Router.post("/sigin",async(req,res)=>{ 
      try{
     await validateSignin (req.body.credentials);   
   const user= await UserModel.findByEmailANDPhone(req.body.credentials)
   const token = user.generateJwtToken();
   return res.status(200).json({token,status: "Success"});

}catch(error){
    return res.status(500).json({error:error.message});
}});

//google auth here
Router .get('/google',passport.authenticate('google',{
  scope:[
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",

  ],
})
);
Router.get("/google/callback",passport.authenticate("google",{failuredirect:"/"}),
(req,res)=>{
  return res.status(200).json({token:req.session.passport.user.token});


}
);

 export default Router;
