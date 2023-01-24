import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema =new mongoose.Schema(
    {
        fullNmae:{type: String, required:true},
        email:{type: String,required: true},
        password:{type: String},
        address:[{detail:{type:String},for:{type:String}}],
        phoneNumber:[{type: Number}],

},

{
    timestamps: true,
}
);

//attachments
UserSchema.methods.generateJwtToken = function(){
    return jwt.sign({user: this._id.toString()},"ZomatoApp");
};


//helper functions
UserSchema.statics.findByEmailAndPhone= async(email,phoneNumber)=>{
    const checkUserByEmail =await UserModel.findOne({email});
    const checkUserByphone =await UserModel.findOne({phoneNumber});


    if(checkUserByEmail || checkUserByphone){
        throw new Error(" User Already Exists!!");
    }
    return false;
};
UserSchema.statics.findByEmailAndPassword= async({email, password})=>{
    const user = await UserModel.findOne({email});
 if (!user) throw new Error("User doesn't exist");

 //compare password
 const doesPasswordMatch = await bcrypt.compare(password, user.password);
 if (!doesPasswordMatch) throw new Error("Invalid Credentails");

 return user;

};

UserSchema.pre("save",function(next){
   const user = this;

//password is been modified or not?
if(!user.isModified("password"))return next();

//generate bcrypt n salt
bcrypt.genSalt(8,(error,salt)=>{
    if (error) return next (error);

    //hash the password
    bcrypt.hash(user.password,salt,(error, hash)=>{
        if(error)return next(error);

        //will be assiging hashed passowrd back
        user.password = hash;
        return next();


    });
});

});

export const UserModel =mongoose.model("users", UserSchema);