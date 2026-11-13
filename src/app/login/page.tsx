"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    useEffect(() => {
        if(user.email.length>0 && user.password.length>0)
            setButtonDisabled(false);
        else
            setButtonDisabled(true);
    }, [user]);

    const onLogin = async () => {
        try{
            setLoading(true);
            setError("");
            const response = await axios.post("/api/users/login", user);
            console.log("Login response:", response.data);
            router.push("/profile");
        }
        catch(error : any) {
            setError("Invalid email or password");
            console.log("Login failed:", error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-7">Login Page</h1>
            <hr />
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                onClick={onLogin}
                disabled={buttonDisabled || loading}
                className="p-2 border border-gray-300 rounded-lg mb-4 cursor-pointer focus:outline-none focus:border-gray-600 disabled:cursor-not-allowed"
            >{loading ? "Logging in..." : "Login"}</button>
            <Link href="/signup">New user? Signup here.</Link>
        </div>
    );
}