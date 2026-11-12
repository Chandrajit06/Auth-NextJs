"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function signupPage() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    })
    
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    useEffect(() => {
        if(user.username.length>0 && user.password.length>0 && user.email.length>0)
            setButtonDisabled(false);
        else
            setButtonDisabled(true);
    }, [user]);

    const onSignup = async () => {
        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>"Signup"</h1>
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
                type="text"
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">Already an user? Login here.</Link>
        </div>
    );
}


/*
value={user.username} makes the input display whatever is in state
...user (the spread operator) copies all existing fields into a new object.
username: e.target.value overwrites just the username in that copy.
*/