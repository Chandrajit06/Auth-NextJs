"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage(){
    const router = useRouter();
    const onLogout = async () => {
        try{
            await axios.get("/api/users/logout");
            router.push("/login");
        }
        catch(error: any){
            console.log(error.message);
        }
    } 

    const [data, setData] = React.useState("");
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res);
        setData(res.data.data._id);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-7">Profile Page</h1>
            <hr />
            <h2 className="mb-2">{data === "" ? "No details found" : 
                <Link href={`/profile/${data}`}>{data}</Link> 
            }</h2>
            <button
                onClick={getUserDetails}
                className="p-2 border border-gray-300 rounded-lg mb-6 cursor-pointer focus:outline-none focus:border-gray-600"
            >Get user details</button>
            <button
                onClick={onLogout}
                className="p-2 border border-gray-300 rounded-lg mb-4 cursor-pointer focus:outline-none focus:border-gray-600"
            >Logout</button>
        </div>
    )
}