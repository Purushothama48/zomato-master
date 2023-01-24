import express from "express";
import passport from "passport";
import { OrderModel } from "../../database/allmodels";

const Router = express.Router();

//get all orders by user id

Router.get("/",passport.authenticate("jwt",{session:false}),async(req,res)=>{
try{
    const {user} =req;
 const getOrders = await OrderModel.findOne({user:user._id});
 if(!getOrders)
 return res.status(400).json({error:"No order for this user found here"});
 return res.status(200).json({orders: getOrders});
}catch(error){
    return res.status(500).json({error:error.message});
}

});

//add new order
Router.put("/new",passport.authenticate("jwt",{session:false}),async(req,res)=>{
try{
    const {user}= req;

    const {orderDetails} =req.body;
    const addNewOrder = await OrderModel.findIdAndUpdate({
        user:user._id,
    },
    {
        $push:{
            orderDetails: orderDetails,
        },
    },
    {
        new:true,
    }
    );
    return res.json({order: addNewOrder});

}catch(error){
    return res.status(500).json({error:error.message});
}
});
export default Router;