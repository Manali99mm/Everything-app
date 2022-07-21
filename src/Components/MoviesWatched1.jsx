import React from "react";
import { CgAdd } from "react-icons/cg";

const MoviesWatched1 = () => {
    return (
        <>
            <div className="flex flex-wrap px-12 py-6">
                <div className="w-44 h-40 mb-6 border-y-8 border-x-4 border-black"></div>
                <div className="w-44 h-40 mb-6  border-y-8 border-x-4  border-black"></div>
                <div className="w-44 h-40 mb-6  border-y-8 border-x-4  border-black"></div>
                <div className="w-44 h-40 mb-6  border-y-8 border-x-4  border-black"></div>
                <div className="w-44 h-40 mb-6  border-y-8 border-x-4  border-black"></div>
                <div className="w-44 h-40 mb-6  border-y-8 border-x-4  border-black"></div>
            </div>
            {/* <div className="px-12 pb-8 pt-6 flex flex-wrap gap-8">
                <div
                    // onClick={() => {
                    //     setId(null)
                    //     setOpenModal(true)
                    // }}
                    className="relative w-52 h-52 cursor-pointer hover:text-red-500"
                    style={{ backgroundImage: "url('https://www.svgrepo.com/show/44395/television.svg')", backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
                >
                    <div className="absolute top-28 left-20">
                        <CgAdd size={30} />

                    </div>
                </div>

                <div
                    // onClick={() => {
                    //     setId(null)
                    //     setOpenModal(true)
                    // }}
                    className="relative w-52 h-52 cursor-pointer"
                    style={{ backgroundImage: "url('https://www.svgrepo.com/show/44395/television.svg')", backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
                >
                    <div className="absolute" style={{ top: "90px" }}>
                        <h1 className="text-base text-center font-bold line-clamp-3" style={{ paddingLeft: "26px", paddingRight: "70px" }}>Sonu Ke Titu ki Sweety</h1>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default MoviesWatched1;