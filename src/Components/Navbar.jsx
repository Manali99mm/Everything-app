import axios from "axios";
import React, { useEffect, useRef } from "react";
import logo from "../assets/navbar-logo.png";
import { getToken } from "../Utilities/getToken";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        avatar: ''
    });
    const [showMenu, setShowMenu] = React.useState(false);
    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        axios.get("http://localhost:4000/user/", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setUser(res.data?.user);
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (showMenu && ref.current && !ref.current.contains(e.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showMenu])

    const logout = () => {
        localStorage.removeItem("every-token");
        navigate("/login");
    }

    return (
        <>
            {/* Large screen */}
            <div className="w-full flex items-center justify-between bg-everyblue h-1/12 py-2 px-4 sticky top-0 z-10">
                <img src={logo} alt="logo" className="w-44 h-full py-1" />
                <div ref={ref}>
                    {
                        user.avatar ?
                            <img
                                src={user.avatar}
                                alt="logo"
                                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                onClick={() => setShowMenu(!showMenu)}
                            />
                            :
                            <BsPersonCircle
                                size={"40px"}
                                color="#fff"
                                className="cursor-pointer"
                                onClick={() => setShowMenu(!showMenu)}
                            />
                    }
                    {showMenu && (
                        <div className="absolute z-50 top-16 bg-white right-0 border border-gray-400 w-fit">
                            <div className="flex gap-2 items-center px-3 py-2 border-b border-gray-400">
                                <div>
                                    {user.avatar ?
                                        <img
                                            src={user.avatar}
                                            alt="logo"
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        :
                                        <BsPersonCircle className="h-9 w-9 rounded-full object-cover" color="gray" />
                                    }
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold">{user.name}</h2>
                                    <h3 className="text-sm text-gray-500">{user.email}</h3>
                                </div>
                            </div>
                            <div onClick={logout} className="flex items-center gap-2 px-3 py-2 cursor-pointer">
                                <AiOutlineLogout color="red" size={20} />
                                <p className="text-base ">Logout</p>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default NavBar