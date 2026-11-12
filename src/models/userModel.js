import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;


/*
This file defines what a user looks like in MongoDB database, using Mongoose.
new mongoose.Schema({...}) defines the template
required: [true, "Please provide..."] means saving a user without that field fails, and the second item is the error message.
mongoose.models.users || mongoose.model("users", userSchema) means if a users model already exists, reuse it, otherwise create it.
*/