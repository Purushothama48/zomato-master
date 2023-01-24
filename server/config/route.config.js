import { Router } from "express";
import jwtPassport from 'passport-jwt';

import {UserModel} from "../database/allmodels";
 const jwtstrategy = jwtPassport.Strategy;

 const ExtractJwt = jwtPassport.ExtractJwt;

 //authorization

 const options ={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    SecretOrKey:"ZomatoApp",
 };

 export default (passport)=>{
    passport.use(
        new jwtstrategy(options, async(jwt_payload, done)=>{
            try{
                const doesUserExist = await UserModel.findById(jwt_payload.user);
                if(!doesUserExist)return done(null,false)
                return done(null, doesUserExist);


            }catch(error){
                throw new Error(error);

            }
        })
    )
 }

 