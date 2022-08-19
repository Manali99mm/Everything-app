import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md"
import { AiOutlineRead } from "react-icons/ai"
import { BiBookReader, BiMoviePlay } from "react-icons/bi"
import { RiDoubleQuotesL } from "react-icons/ri"
import { ImBooks } from "react-icons/im"

const SidebarNav = () => {
    const { type } = useParams();
    return (
        <>
            {/* Mobile */}
            <div className="md:hidden h-screen p-2 sticky top-16 bottom-0 w-1/6 flex flex-col items-center bg-white">
                <Link to="/dashboard">
                    <div className={type === "dashboard" ? "p-2 text-[#7f094b] cursor-pointer" : "p-2 text-everyblue cursor-pointer"}>
                        <MdOutlineDashboard size={22} />
                    </div>
                </Link>
                <Link to="/reading-tracker">
                    <div className={type === "reading-tracker" ? "p-2 text-[#7f094b] cursor-pointer" : "p-2 text-everyblue cursor-pointer"}>
                        <AiOutlineRead size={22} />
                    </div>
                </Link>
                <Link to="/read-challenge">
                    <div className={type === "read-challenge" ? "p-2 text-[#7f094b] cursor-pointer" : "p-2 text-everyblue cursor-pointer"}>
                        <BiBookReader size={22} />
                    </div>
                </Link>
                <Link to="/tbr" >
                    <div className={type === "tbr" ? "p-2 text-[#7f094b] cursor-pointer" : "p-2 text-everyblue cursor-pointer"}>
                        <ImBooks size={22} />
                    </div>
                </Link>
                <Link to="/series-tracker">
                    <div className={type === "series-tracker" ? "p-2 text-[#7f094b] cursor-pointer" : "p-2 text-everyblue cursor-pointer"}>
                        <BiMoviePlay size={22} />
                    </div>
                </Link>
                <Link to="/quotes">
                    <div className={type === "quotes" ? "p-2 text-[#7f094b] cursor-pointer" : "p-2 text-everyblue cursor-pointer"}>
                        <RiDoubleQuotesL size={22} />
                    </div>
                </Link>
            </div>

            {/* Large and medium screen */}
            <div className="bg-white hidden md:block md:w-1/3 lg:w-1/6 h-screen p-2 sticky top-16 bottom-0">
                <Link to="/dashboard" >
                    <div className={type === "dashboard" ? "p-2 flex gap-2 items-center cursor-pointer text-[#7f094b]" : "p-2 flex gap-2 items-center cursor-pointer text-everyblue"}>
                        <MdOutlineDashboard size={22} />
                        Dashboard
                    </div>
                </Link>
                <Link to="/reading-tracker">
                    <div className={type === "reading-tracker" ? "p-2 flex gap-2 items-center cursor-pointer text-[#7f094b]" : "p-2 flex gap-2 items-center cursor-pointer text-everyblue"} >
                        <AiOutlineRead size={22} />
                        Reading Tracker
                    </div>
                </Link>
                <Link to="/read-challenge">
                    <div className={type === "read-challenge" ? "p-2 flex gap-2 items-center cursor-pointer text-[#7f094b]" : "p-2 flex gap-2 items-center cursor-pointer text-everyblue"}>
                        <BiBookReader size={22} />
                        Reading Challenge
                    </div>
                </Link>
                <Link to="/tbr">
                    <div className={type === "tbr" ? "p-2 flex gap-2 items-center cursor-pointer text-[#7f094b]" : "p-2 flex gap-2 items-center cursor-pointer text-everyblue"}>
                        <ImBooks size={22} />
                        TBR List
                    </div>
                </Link>
                <Link to="/series-tracker">
                    <div className={type === "series-tracker" ? "p-2 flex gap-2 items-center cursor-pointer text-[#7f094b]" : "p-2 flex gap-2 items-center cursor-pointer text-everyblue"}>
                        <BiMoviePlay size={22} />
                        Movie/Series Tracker
                    </div>
                </Link>
                <Link to="/quotes">
                    <div className={type === "quotes" ? "p-2 flex gap-2 items-center cursor-pointer text-[#7f094b]" : "p-2 flex gap-2 items-center cursor-pointer text-everyblue"}>
                        <RiDoubleQuotesL size={22} />
                        Quotes from Books
                    </div>
                </Link>
            </div>
        </>
    )
}

export default SidebarNav;