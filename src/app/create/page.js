"use client";
import Link from "next/link";
import {useState} from "react"

export default function Create() {

    const [user, setUser] = useState("Username");

  return (
    <main id="create" className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">

        <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">

          <div className = "flex flex-col justify-center items-center bg-center avatar aspect-square overflow-visible h-screen bg-explosion bg-no-repeat bg-[length:950px]" >
            
              <div className = "flex flex-col justify-center items-center mt-10 mb-28">
                  
                  <h1 className="text-6xl font-bold tracking-wide my-12">
                    Create Lobby
                  </h1>  
                </div>
                  
                <div className="flex flex-col justify-center space-y-12"> 
                    <div className>
                        <input type="text" id="username" class="outline-none bg-red-500 border-4 border-red-600 text-white rounded-full shadow-md text-xl font-bold tracking-widest px-10
                            focus:ring-yellow-100 focus:border-yellow-100 block w-full p-2.5" placeholder="Username" val={user} onUserChange ={(e) => setUser(e.target.value)} />
                    </div>

                  <button className="p-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                    outline-none bg-red-500 border-4 border-red-800">
                        <Link className = "text-xl font-bold tracking-widest px-10"
                            href={"./lobby"}
                            id="lobby">
                            CREATE CODE
                        </Link>
                  </button>
                </div>
            </div>
         </div>
    </main>
  );
}