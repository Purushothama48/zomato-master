import mongoose from "mongoose";

const FoodSchema =new mongoose.Schema(
    {
name:{type: String, required:true },
descript: { type: String, required : true},
isVeg: { type: Boolean, required: true},
isContainsEggs: { type: Boolean, required: true},
category : { type: String, required: true},

photos:{
    type : mongoose.Types.objectId,
ref:"images",
},

price : {type:Number,defualt: 150,requrired:true},
addOns :[{
    type:mongoose.Types.objectId,
    ref:"foods"
}],
resturant:{
    type:mongoose.Types.objectId,
    ref:"resturants",
    required: true
}
},

{
    timestamps: true,
});

export const Foodmodel =mongoose.model("foods",FoodSchema);