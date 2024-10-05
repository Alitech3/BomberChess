"use client"

import Link from "next/link";

export default function Home() {

  return (
    <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">

        <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">

          <div className= "flex flec-col justify-center items-center bg-gradient-to-r from-transparent via-green-700 to-transparent rounded-lg">
          <div className = "flex flex-col justify-center items-center bg-center avatar aspect-square overflow-visible h-screen bg-explosion bg-no-repeat bg-[length:950px]" >
            
            <div className = "flex flex-col justify-center items-center mt-10 mb-28">
              
              <h1 className="text-6xl font-bold tracking-wide my-12">
                Bomber Chess
              </h1>  
            </div>
              
            <div className="flex flex-col justify-center space-y-12"> 
              <button className="p-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800">
                    <Link className = "text-xl font-bold tracking-widest px-10" 
                        href={"/create"}
                        id="create">
                        CREATE
                    </Link>
              </button>
              <button className="p-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800">
                    <Link className = "text-xl font-bold tracking-widest px-10"
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