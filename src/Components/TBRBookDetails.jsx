import axios from "axios";
import React from "react";
import { getToken } from "../Utilities/getToken";

const TbrBookDetails = ({ book, showDetails }) => {
    const removeFromTbr = () => {
        axios.put("https://everything-apis.herokuapp.com/tbr/remove", { bookId: book._id, cloudinary_id: book.cloudinary_id }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full  my-6 mx-auto max-w-2xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {book.title}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => showDetails(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    X
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <>
                            <div className="relative flex-auto">
                                <div className="flex px-8 py-6 gap-6">
                                    {book.cover ? <img src={book.cover} alt="cover" className="w-40 h-48" /> : (
                                        <div className="w-40 h-48 border-r-8 border-t-4 border-black bg-red-500 p-2 flex flex-col justify-center items-center text-center gap-2 overflow-hidden">
                                            <h1 className="text-lg text-white font-semibold line-clamp-3">{book.title}</h1>
                                            <h2 className="text-white line-clamp-2">by {book.author}</h2>
                                        </div>
                                    )}
                                    <div>
                                        <h1 className="text-xl"><span className="font-semibold">Title:</span> {book.title}</h1>
                                        <h1 className="text-xl"><span className="font-semibold">Author:</span> {book.author}</h1>
                                        <div className="flex mt-4 gap-2 md:gap-4 items-center">
                                            <h4 className="text-lg text-everyblue">Started Reading?</h4>
                                            <button
                                                onClick={removeFromTbr}
                                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                Remove from TBR
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>


                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default TbrBookDetails;