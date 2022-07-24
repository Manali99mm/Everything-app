import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { getToken } from "../Utilities/getToken";

const AddReadingChallengeModal = ({ setShowModal, edit, goal }) => {
    const [totalBooks, setTotalBooks] = React.useState(goal);

    const startReadingChallenge = () => {
        axios.post("https://everything-apis.herokuapp.com/user/readingChallenge", { totalBooks }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setShowModal(false);
                window.location.reload()
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-2 mx-auto max-w-xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {edit ? "Edit" : (dayjs().format("YYYY"))} Reading Challenge
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    X
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto">
                            <div className="relative w-full px-6 py-4 text-left">
                                {edit ? <p>Change the number of books you would like to read in {dayjs().format("YYYY")}</p> : <p>Tell us how many books you want to read in {dayjs().format("YYYY")}.</p>}
                                <input
                                    value={totalBooks}
                                    type="number"
                                    placeholder="#"
                                    className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                    onChange={(e) => setTotalBooks(e.target.value)}
                                />
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={startReadingChallenge}
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AddReadingChallengeModal;