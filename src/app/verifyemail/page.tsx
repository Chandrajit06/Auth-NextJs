"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try{
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        }
        catch(error: any){
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [token]);

    useEffect(() => {
        if(token.length > 0)
            verifyUserEmail();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-7">Verify Email Page</h1>
            <h2 className="p-1 bg-cyan-500 text-black">{token ? `${token}` : "no token"}</h2>

            {!verified && !error && <h2 className="mt-4">Verifying...</h2>}
            {verified && (
                <div className="mt-3 flex flex-col items-center justify-center">
                    <h2 className="text-2xl">Email verified !</h2>
                    <Link href="/login" className="text-blue-500">Go to login</Link>
                </div>
            )}

            {error && (
                <h2 className="mt-4 text-red-500">
                    Invalid or expired link.
                </h2>
            )}
        </div>
    );
}


/*
verifyUserEmail function sends the token to API route in the request body. If the request succeeds, it sets verified to true. If it fails, it sets error to true and logs the server’s error message.
For a URL like /verifyemail?token=abc123, window.location.search is ?token=abc123. Splitting at = gives ["?token", "abc123"], and [1] takes the second part, the token.
Once token is not empty, it calls verifyUserEmail(). This runs again whenever token changes.
*/