"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    })
    
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if(user.username.length>0 && user.password.length>0 && user.email.length>0)
            setButtonDisabled(false);
        else
            setButtonDisabled(true);
    }, [user]);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup response:", response.data);
            router.push("/login");
        }
        catch(error : any) {
            console.error("Signup failed:", error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-7">Signup Page</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
                onClick={onSignup}
                disabled={buttonDisabled || loading}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none disabled:cursor-not-allowed cursor-pointer focus:border-gray-600"
            >{loading ? "Signing up..." : "Signup"}</button>
            <Link href="/login">Already an user? Login here.</Link>
        </div>
    );
}


/*
In Next.js (App Router), components are server components by default. use Client says “run this in the browser”
useEffect with [user] means “run this after every render where user changed.” It checks the form after each keystroke and only unlocks the button when all three fields are filled.
This sends the user object as JSON to API route (/api/users/signup). If the request succeeds, router.push("/login") navigates to the login page without a full page reload. If it fails, the catch logs the error to the console.
value={user.username} makes the input display whatever is in state
...user (the spread operator) copies all existing fields into a new object.
username: e.target.value overwrites just the username in that copy.
*/