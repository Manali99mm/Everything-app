import React from "react";
import logo from "../assets/navbar-logo.png";

const NavBar = () => {
    return (
        <>
            {/* Large screen */}
            <div className="w-full hidden md:block md:flex items-center justify-between bg-everyblue h-1/12 py-2 px-4 sticky top-0 z-10">
                <img src={logo} alt="logo" className="w-44 h-full py-1" />
                <div className="bg-[#F7F3E8] h-10 w-10 rounded-full"></div>
            </div>
        </>
    )
}

export default NavBar