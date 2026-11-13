export default async function ProfileIdPage({params}: any){
    const {id} = await params;
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-7">Profile Id Page</h1>
            <hr />
            <p className="text-2xl">Profile 
                <span className=" p-1 ml-2 rounded bg-cyan-500 text-black">{id}</span>
            </p>
        </div>
    )
}