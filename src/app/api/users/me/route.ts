import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        await connect();
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user,
        });
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}


/*
This is an API route that returns the currently logged-in user’s profile.
In the Next.js App Router, exporting a function named GET from a route.ts file means “run this when someone sends a GET request to this URL.
Calls the helper, which reads the token cookie, verifies it, and returns the user’s id.
Searches the users collection for the document whose _id matches and gives everything except the password field.
*/