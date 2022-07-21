import axios from "axios";
import React, { useEffect } from "react";
import { SiAddthis } from "react-icons/si";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { getToken } from "../Utilities/getToken";
import AddToTbrModal from "./AddToTbrModal";

const TBR = () => {
    const [showTbrModal, setShowTbrModal] = React.useState(false);
    const [tbrList, setTbrList] = React.useState([]);

    useEffect(() => {
        console.log("hjhj");
        axios.get("http://localhost:4000/tbr/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setTbrList(res.data.books);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <h1 className="text-2xl uppercase font-semibold text-gray-600 px-8 mt-2">To Be Read</h1>
            <div className="flex gap-10 m-8 flex-wrap">
                <div
                    onClick={() => setShowTbrModal(true)}
                    className="p-2 h-48 md:h-48 lg:h-64 w-40 md:w-1/4 lg:w-1/5 border border-gray-300 bg-white shadow-lg flex flex-col gap-2 justify-center items-center hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
                >
                    <SiAddthis size={40} className="text-everyblue" />
                </div>
                {tbrList.map((t) => (
                    <div className="relative h-48 md:h-48 lg:h-64 w-40 md:w-1/4 lg:w-1/5 border border-black bg-white shadow-lg overflow-hidden border-r-8 border-b-2 border-t-4 ">
                        {t.cover ?
                            <img src={t.cover} alt="cover" className="w-full h-full" />
                            :
                            <div className="flex flex-col gap-2 justify-center items-center text-center h-full w-full p-2">
                                <h1 className="text-base font-semibold text-center">{t.title}</h1>
                                <h2 className="text-gray-500 text-sm text-center">by {t.author}</h2>
                            </div>
                        }
                        <div className="absolute cursor-pointer top-0 left-0"
                        >
                            <BsBookmarkCheckFill size={35} className="-ml-1.5 -mt-1 hover:text-green-400" />
                        </div>
                    </div>
                ))}

            </div>
            {showTbrModal && <AddToTbrModal setShowTbrModal={setShowTbrModal} />}
        </>
    )
}

export default TBR;