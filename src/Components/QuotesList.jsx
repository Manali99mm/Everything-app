import React, { useEffect } from "react";
import NavBar from "./Navbar";
import SidebarNav from "./SideBarNav";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import { getToken } from "../Utilities/getToken";
import AddQuoteModal from "./AddQuoteModal";
import LoaderSpinner from "./LoaderSpinner";

const QuotesList = () => {
    const [showModal, setShowModal] = React.useState(false);
    const { id } = useParams();
    const [details, setDetails] = React.useState({
        book: "",
        author: "",
        quotes: []
    })
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://everything-apis.herokuapp.com/quote/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                const { book, author, quotes } = res.data
                setDetails({
                    book,
                    author,
                    quotes
                })
            })
            .catch((err) => console.log(err));
    }, [id])

    const deleteQuotes = () => {
        axios.delete(`https://everything-apis.herokuapp.com/quote/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then(res => {
                console.log(res.data);
                navigate("/quotes", { replace: true })
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="h-full flex flex-col text-gray-600">
                <NavBar />
                <div className="w-full flex h-11/12">
                    <SidebarNav />
                    <div className="w-5/6 bg-gray-100 p-4 lg:px-8 flex flex-col gap-4 h-screen">
                        {isLoading ? (
                            <div className="flex w-full justify-center p-8">
                                <LoaderSpinner />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-xl font-semibold text-gray-700">{details.book} Quotes</h1>
                                <div className="flex justify-between w-full lg:w-2/3 gap-2 items-center">
                                    <div>
                                        <h1 className="text-base font-semibold text-gray-600">{details.book}</h1>
                                        <h2 className="text-sm font-gray-500">by {details.author}</h2>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowModal(true)
                                        }}
                                        className="bg-everyblue text-white font-bold uppercase text-sm p-2 md:px-4 md:py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 "
                                        type="button"
                                    >
                                        Add Quote
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {details.quotes.map((q) => (
                                        <div className="italic px-2 rounded-lg pt-2 pb-4 bg-white border-b border-gray-400 w-full lg:w-2/3">
                                            “{q}”
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={deleteQuotes}
                                    className="bg-red-600 active:bg-red-600 text-white font-bold uppercase text-sm p-2 md:px-4 md:py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 w-fit"
                                    type="button"
                                >
                                    Delete All Quotes
                                </button>
                            </>)}
                    </div>
                </div>
            </div>
            {showModal && <AddQuoteModal setShowModal={setShowModal} id={id} />}
        </>
    )
}

export default QuotesList;