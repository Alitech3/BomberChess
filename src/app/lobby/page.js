import "./lobby.css";

export default function Home() {

    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className = "flex flex-col justify-center items-center h-screen bg-yellow">
                    <button id = "button" className="bg-yellow-500 rounded-full text-6xl font-bold tracking-wide my-12 ">
                UNIQUE ID</button>  
                    <div id = "outline" className = "flex flex-col justify-center items-center mt-10 mb-28">
                        <div className = "flex flex-col justify-center items-center mt-10 mb-28"> 
                            <div className = "flex flex-col justify-center items-center mt-10 mb-28">
                                <div className ="row">
                                    <div className = "column">
                                        <button id = "button" className = "text-3xl font-bold"> Team 1 </button>
                                        <button id = "button" className = " text-3xl font-bold"> Team 2 </button>
                                    </div>
                                    <div className = "column">
                                        <button id = "button" className = "text-3xl font-bold"> Player 1 </button>
                                        <button id = "button" className = " rounded-full text-3xl font-bold"> Player 2 </button>
                                    </div>
                                    <div className = "column">
                                        <button id = "button" className = " rounded-full text-3xl font-bold"> Rotate </button>
                                    </div>
                                    <div className = "column">
                                        <button id = "button" className = " rounded-full text-3xl font-bold"> Player 3</button>
                                        <button id = "button" className = " rounded-full text-3xl font-bold"> Player 4 </button>
                                    </div>
                                </div> 
                            </div>
                            <button className="p-12 bg-yellow-500 text-white shadow-md hover:bg-yellow-600 transition hover:text-black duration-200">
                START </button>
                        </div>
                    </div >
                </div>
            </div>

            

        

        </main>
    );
}