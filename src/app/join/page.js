"use client";
import Link from "next/link";
import { useState } from "react"

export default function Join() {

  const [user, setUser] = useState("");
  const [submittedUser, setSubmittedUser] = useState("");
  const [code, setCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");

  return (
    <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">

      <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">

        <div className="flex flec-col justify-center items-center bg-gradient-to-r from-transparent via-green-700 to-transparent rounded-lg">
          <div className="flex flex-col justify-center items-center bg-center avatar aspect-square overflow-visible h-screen bg-explosion bg-no-repeat bg-[length:950px]" >

            <div className="flex flex-col justify-center items-center mt-10 mb-28">

              <h1 className="text-6xl font-bold tracking-wide my-12">
                Join Lobby
              </h1>
            </div>

            <div className="flex flex-col justify-center items-center w-60 space-y-12">

              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input value={user} onChange={(e) => setUser(e.target.value)} type="text" id="username" placeholder="Username"
                  className="outline-none bg-red-500 border-4 border-red-600 text-center text-white rounded-full shadow-md text-xl font-bold tracking-widest px-10
                            focus:ring-yellow-100 focus:border-yellow-100 block w-full p-2.5"/>
                <button className="opacity-0" onClick={() => setSubmittedUser(user)}> </button>
              </form>

              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input value={code} onChange={(e) => setCode(e.target.value)} type="text" id="code" placeholder="Enter Code"
                  className="outline-none bg-red-500 border-4 border-red-600 text-center text-white rounded-full shadow-md text-xl font-bold tracking-widest px-10
                              focus:ring-yellow-100 focus:border-yellow-100 block w-full p-2.5"/>
                <button className="opacity-0" onClick={() => setSubmittedCode(code)}> </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}