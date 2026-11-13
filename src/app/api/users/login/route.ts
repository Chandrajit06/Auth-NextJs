import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try{
        await connect();
        const reqBody = await request.json();
        const {email, password} = reqBody;
        if(!email || !password){
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }
        
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 404});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid password"}, {status: 401});
        }

        const tokenData = {
            id: user._id, 
            username: user.username, 
            email: user.email
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


/*
A JWT is a signed bundle of info about the user. It’s like the hand stamp: the server signs it with a secret key (TOKEN_SECRET), so it can later verify the token wasn’t forged or tampered with. It expires after 1 day.
The token is stored in a cookie. httpOnly: true means JavaScript running in the browser can’t read it, which protects it from being stolen by XSS attacks. The browser automatically sends this cookie with future requests.
Payload (tokenData): the info you want inside the token (id, username, email).
Secret (TOKEN_SECRET): a private string that only your server knows.
Options (expiresIn: "1d"): the token becomes invalid after 1 day.
xxxxx.yyyyy.zzzzz => header.payload.signature
*/