import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    }
    catch(error: any){
        throw new Error(error.message);
    }
}

/*
This is a small helper function that figures out who is making a request by reading and verifying a login token stored in a cookie.
request.cookies.get looks in the browser’s cookies for one named token. If it’s missing, token becomes an empty string.
jwt.verify checks the token’s signature using TOKEN_SECRET from .env file, so it confirms the token wasn’t forged or tampered with and checks that the token hasn’t expired.
If valid, it returns the payload (the data you put inside the token when you created it, like { id, email, ... }). The ! tells TypeScript “trust me, this env variable exists.”
*/