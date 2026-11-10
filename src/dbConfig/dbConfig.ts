import mongoose from "mongoose";

export async function connect(){
    if(mongoose.connection.readyState >= 1)    
        return;
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
}


/*
This code is a small helper that connects your app to a MongoDB database using Mongoose, and it makes sure you only connect once.
Mongoose keeps track of its connection state with a number: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting. So >= 1 means “a connection already exists or is being made.” In that case the function exits early instead of opening a second connection.
The ! at the end is TypeScript’s “non-null assertion.” It tells the compiler “trust, this value exists,”
If the connection fails (wrong URL, database down, network issue), it logs the error and kills the entire Node process with exit code 1 (which means “something went wrong”).
*/