import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest){
    try{
        await connect();
        const {token} = await request.json();
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user)
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        })
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


/*
the token sent from the frontend searches for a user where both are true: verifyToken equals the token sent
verifyTokenExpiry is greater than now ($gt means “greater than”), so the token hasn’t expired yet
It flips isVerified to true, then removes the token and expiry so the link can’t be reused. save() writes the changes to the database.

User signs up → sendEmail saves verifyToken in the DB and emails a link.
User clicks the link → your frontend page (/verifyemail?token=...) reads the token from the URL.
That page sends the token to this route with a POST request.
This route verifies it and marks the user as verified.
*/