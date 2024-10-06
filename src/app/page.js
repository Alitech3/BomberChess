import Link from "next/link";

export default function Home() {
    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">

            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">

                <div className= "flex flec-col justify-center items-center bg-gradient-to-r from-transparent via-green-700 to-transparent rounded-lg">
                    <div className = "flex flex-col justify-center items-center bg-center avatar aspect-square overflow-visible h-screen bg-explosion bg-no-repeat bg-[length:950px]" >
            
                        <div className = "flex flex-col justify-center items-center mt-20 mx-10 w-1/2 text-center">
              
                            <h1 className="text-6xl font-bold tracking-wide my-5">
                Bomber Chess
                            </h1>  
                        </div>
              
                        <div className="flex flex-col justify-center space-y-12 mt-4"> 
                            <button className="px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800">
                                <Link className = "text-xl font-bold tracking-widest px-5 w-5 h-5" 
                                    href={"/create"}
                                    id="create">
                        CREATE
                                </Link>
                            </button>
                            <button className="px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800">
                                <Link className = "text-xl font-bold tracking-widest px-5 w-5 h-5"
                                    href={"/join"}
                                    id="join">
                        JOIN
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>

          
            </div>
        </main>
    );
}