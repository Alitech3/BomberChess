import "./lobby.css";

export default function Home() {

    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className="flex flex-col justify-center items-center h-screen bg-half bg-contain border-4 border-black rounded-lg">
                    <button id="button" className="px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-6xl font-bold tracking-wide my-12 ">
                        UNIQUE ID</button>
                    <div id="outline" className="flex flex-col justify-center items-center border-none">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center mt-10 mb-28">
                                {/* <div className="row"> */}
                                <div className="column">
                                    <button id="button" className="mx-8 px-8 py-5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 text-3xl font-bold"> Team 1 </button>
                                    <button id="button" className="mx-8 px-8 py-5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 text-3xl font-bold"> Team 2 </button>
                                </div>
                                <div className="my-14 grid grid-cols-2 gap-4 justify-center items-center">

                                    <button id="button" className="mr-5 px-8 py-5 bg-white text-black rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold"> Player 1 </button>
                                    <button id="button" className="ml-5 px-8 py-5 bg-white text-black rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold"> Player 2 </button>
                                    <button id="button" className="px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold col-span-3"> Rotate </button>
                                    <button id="button" className="mr-5 px-8 py-5 bg-black text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-white duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold"> Player 3</button>
                                    <button id="button" className="ml-5 px-8 py-5 bg-black text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-white duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold"> Player 4 </button>
                                </div>

                                {/* </div> */}
                                <button className="mt-5 px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
                                outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold col-span-3">
                                    START </button>
                            </div>
                        </div >
                    </div>
                </div>
            </div>





        </main>
    );
}