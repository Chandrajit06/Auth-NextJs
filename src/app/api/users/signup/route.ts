import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest){
    try{
        await connect();
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        if (!username || !email || !password)
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });

        const user = await User.findOne({email});
        if(user)
            return NextResponse.json({error: "User already exists"}, {status: 400});

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {id: savedUser._id, username: savedUser.username, email: savedUser.email}, 
        })
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


/*
This is a signup (user registration) API endpoint for a Next.js app. When a client sends a request with a username, email, and password, it creates a new user in the database.
connect() runs once at the top to open the database connection.
request.json() reads the body the frontend sent, and the code destructures username, email, and password out of it
User.findOne({email}) looks for an existing user with that email. If one exists, it returns a 400 error (“User already exists”) and stops.
genSalt(10) creates random “seasoning” (the salt), and bcryptjs.hash mixes it with the password to produce a scrambled string.The salt also means two users with the same password get different hashes.
A new User document is created with the hashed password (never the plain one) and saved with .save()
_id is the unique ID MongoDB automatically gives every document it stores.
On success it returns a JSON message and the saved user. If anything throws, the catch block returns a 500 error with the error message.
*/