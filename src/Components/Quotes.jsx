import axios from "axios";
import React, { useEffect } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { getToken } from "../Utilities/getToken";
import AddQuoteModal from "./AddQuoteModal";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";

const Quotes = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [quotes, setQuotes] = React.useState([]);
    const [id, setId] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        axios.get("https://everything-apis.herokuapp.com/quote/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                setQuotes(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>

            <div className="p-4 flex flex-col justify-center items-center gap-2">
                <h1 className="text-2xl uppercase font-semibold text-gray-600 px-8">Quotes</h1>
                <p>Add your favorite quotes from your favorite books here!</p>
                <div className="px-8 py-4 bg-white rounded-lg shadow-lg mt-4 flex flex-col justify-center items-center gap-2">
                    <div className="flex gap-2">
                        <ImQuotesLeft className="-mt-1" />
                        <p className="italic text-center">Procrastination is the thief of time, collar him.</p>
                        <ImQuotesRight className="mt-8 md:mt-3" />
                    </div>
                    <div className="flex flex-col justify-center items-center text-gray-600">
                        <p>David Copperfield</p>
                        <p>Charles Dickens</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setId(null);
                        setShowModal(true)
                    }}
                    className="bg-everyblue text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4"
                    type="button"
                >
                    Add New Quote
                </button>
            </div>
            <div className="p-4 m-2 mb-8 flex flex-col gap-4 flex-wrap">
                {isLoading ? (
                    <div className="w-full flex justify-center">
                        <LoaderSpinner />
                    </div>
                ) : quotes.map((q) => (
                    <div className="bg-white p-4 rounded-lg border border-gray-400 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div>
                            <p className="italic mb-1 text-gray-600 font-semibold">"{q.quotes[0]}"</p>
                            <h1 className="text-gray-600">{q.book}</h1>
                            <h2 className="text-gray-500 text-sm">by {q.author}</h2>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setId(q._id)
                                    setShowModal(true)
                                }}
                                className="bg-everyblue text-white font-bold uppercase text-2xl px-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                type="button"
                            >+</button>
                            <button
                                onClick={() => navigate(`/quote/${q._id}`)}
                                className="bg-everyblue text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                            >See all quotes</button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <AddQuoteModal setShowModal={setShowModal} id={id} />}
        </>
    )
}

export default Quotes;