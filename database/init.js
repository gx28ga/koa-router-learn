import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import keys from "./../config/keys";

const url=keys.MongoURI;

export default {
    connect: () => {
        let maxConnectTimes = 0;
        return new Promise((resolve, reject) => {
            if (process.env.NODE_ENV !== "production") {
                mongoose.set("debug", true);

            }

            mongoose.connect(url,{
              useNewUrlParser: true
            });


            mongoose.connection.once("open",()=>{
                console.log("MongoDB connected successfully")
            })
        })

        
    }
}