import Link from "next/dist/client/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-4xl font-bold mb-10">Next.js Authentication</h1>
            <div className="flex flex-col items-center justify-center text-xl gap-1">
                <p>New to the app? Visit the <Link href="/signup" className="text-blue-500">Signup Page</Link></p> 
                <p>Already have an account? Visit the <Link href="/login" className="text-blue-500">Login Page</Link></p> 
                <p>Already logged in? Visit the <Link href="/profile" className="text-blue-500">Profile Page</Link></p>
            </div>
            <p className="mt-7 text-lg">
                This is a simple authentication system built with Next.js, MongoDB, and NextAuth.js.
            </p>
        </div>
    );
}
