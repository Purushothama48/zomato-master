import googleOAuth from "passport-google-Oauth2";
import passport from "passport";
import {UserModel} from "../database/allmodels";

const GoogleStrategy = googleoAuth.Strategy;

export default (passport)=>{
    passport.use(
        new GoogleStrategy({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientScre:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback"

        },
        async(accessToken,refreshToken,profile,done)=>{
            const newUser={
                fullName:profile.displayName,
                email:profile.email[0],
                profilepic:profile.photos[0].value,

            };
            try{
                const user= await UserModel.findOne({email:newUser.email});
                if(user)
                {
                    const token = user.generateJwtToken();
                done(null,{user,token})
            }else{
                const user= await UserModel .create(newUser);
                const token = user .generateJwtToken();
                done(null,{user,token})
            }

            }catch(error){
                done(error,null)
            }
        }
        )
    );
    passport.serializeUser((userData,done)=>done(null,{...userData}));
    passport.deserializeUser((id,done)=>done(null,id));

};

