import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


/*
NextResponse.json builds the response body that the frontend receives, in JSON form.
response.cookies.set sets a cookie named token with these properties:
Value "": the token’s contents are emptied.
expires: new Date(0): Browsers delete cookies whose expiry has passed, so the cookie is removed right away.
httpOnly: true: JavaScript running in the browser (document.cookie) can’t read this cookie.to overwrite or delete a cookie, you generally need to match its attributes.
*/