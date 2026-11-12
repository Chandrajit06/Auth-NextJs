async function ProfileIdPage({params}: any){
    const {id} = await params;
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page 
                <span className=" p-1 ml-2 rounded bg-cyan-500 text-black">{id}</span>
            </p>
        </div>
    )
}

export default ProfileIdPage;