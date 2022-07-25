import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { getToken } from "../Utilities/getToken";
import AddReadingChallengeModal from "./AddReadingChallengeModal";

const ReadingChallenge = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [readingChallenge, setReadingChallenge] = React.useState({});
    const [edit, setEdit] = React.useState(false);

    useEffect(() => {
        axios.get("https://everything-apis.herokuapp.com/user/", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setReadingChallenge(res.data?.user?.readingChallenge);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="p-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-gray-600 font-semibold uppercase text-2xl text-center mb-6">{dayjs().format("YYYY")} Reading Challenge</h1>
                {
                    readingChallenge.totalBooks ? (
                        <>
                            <div className="w-full bg-white p-4 space-y-2 rounded-lg shadow-lg w-full lg:w-1/2">
                                <h1 className="text-left font-semibold">You've read {readingChallenge.booksRead} of {readingChallenge.totalBooks} books</h1>
                                <div className="flex items-center gap-1 justify-center">
                                    <div className="w-full bg-gray-200 rounded-full">
                                        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${readingChallenge.progress}%` }}></div>
                                    </div>
                                    <div>{Math.round(readingChallenge.progress)}%</div>
                                </div>
                                <button
                                    className="text-emerald-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(true)
                                        setEdit(true)
                                    }}
                                >
                                    Edit Goal
                                </button>
                            </div>
                        </>
                    ) :
                        <button
                            onClick={() => {
                                setShowModal(true)
                                setEdit(false)
                            }}
                            className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-fit"
                            type="button"
                        >
                            Start Reading Challenge
                        </button>
                }
            </div>
            {
                readingChallenge.totalBooks && (
                    <div className="p-4 mt-4">
                        <h1 className="text-lg font-semibold text-gray-600 uppercase text-center">Books I Have Read</h1>
                        {readingChallenge.books.length > 0 ? (
                            <div className="py-8 md:px-4 flex flex-wrap justify-start gap-4">
                                {readingChallenge.books.map((book) => (
                                    <div className="bg-gray-600 flex rounded-sm w-full md:w-1/3 lg:w-1/4 grow md:max-w-rt">
                                        {book.cover && (
                                            <img src={book.cover} alt="cover" className="w-24 md:w-28 h-full" />
                                        )}
                                        <div className="p-2 text-white">
                                            <h1 className="text-base line-clamp-2 leading-tight">{book.title}</h1>
                                            <h1 className="text-sm line-clamp-1">by {book.author}</h1>
                                            <div className="mt-4">
                                                <p className="text-xs -mb-1">My Rating</p>
                                                <ReactStars
                                                    edit={false}
                                                    value={book.rating}
                                                    size={24}
                                                    isHalf={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>)
                            : (
                                <p className="text-center py-4">You haven't read any books yet. Start reading!</p>
                            )}
                    </div>
                )
            }
            {showModal && <AddReadingChallengeModal setShowModal={setShowModal} edit={edit} goal={readingChallenge.totalBooks ? readingChallenge.totalBooks : 0} />}
            {/* <div className="flex gap-4 justify-center">
                <button
                    onClick={() => {
                        setShowModal(true)
                        setType("monthly")
                    }}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                >
                    Monthly
                </button>
                <button
                    onClick={() => {
                        setShowModal(true)
                        setType("yearly")
                    }}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                >
                    Yearly
                </button>
            </div> */}
        </div>
    )
}

export default ReadingChallenge;