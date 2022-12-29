import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../Utilities/getToken";
import dayjs from "dayjs";
import AddNewBookModal from "./AddNewBookModal";
import ReactStars from "react-rating-stars-component";
import CurrentlyReading from "./CurrentlyReading";
import LoaderSpinner from "./LoaderSpinner";
import { BiSearch } from "react-icons/bi";

const ReadingTracker = () => {
    const [showNewBookModal, setShowNewBookModal] = React.useState(false);
    const [Id, setId] = React.useState();
    const [books, setBooks] = React.useState([]);
    const [selectedBook, setSelectedBook] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchString, setSearchString] = React.useState("");

    useEffect(() => {
        setIsLoading(true)
        axios.get("/book/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/book/search`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: {
                qry: searchString
            }
        })
            .then((res) => {
                setIsLoading(false)
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, [searchString])

    return (
        <div className="p-4">
            <h1 className="text-2xl uppercase font-semibold text-gray-600 px-8">Reading Tracker</h1>
            {/* Currently Reading */}
            <CurrentlyReading />
            {/* Book Shelf */}
            <section className="w-full antialiased text-gray-600 md:px-8 py-6">
                <div className="flex flex-col justify-start h-full">
                    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
                        {/*header for small screens*/}
                        <header className="md:hidden px-5 py-4 border-b border-gray-100 gap-2">
                            <div className="flex gap-1 justify-between items-center">
                                <h2 className="font-semibold text-lg text-gray-800">Book Shelf <span className="text-gray-500">({books.length})</span></h2>
                                <button className="bg-everyblue py-2 px-4 rounded-lg text-white" onClick={() => {
                                    setId(null);
                                    setSelectedBook();
                                    setShowNewBookModal(true)
                                }}>Add Book</button>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-md border border-2 px-2 py-1 mt-3 ">
                                <BiSearch />
                                <input
                                    type="search"
                                    className="w-full bg-transparent border-none focus:outline-none "
                                    placeholder="Search by title or author"
                                    value={searchString}
                                    onChange={(e) => setSearchString(e.target.value)}
                                />
                            </div>
                        </header>
                        {/*header for medium and large screens */}
                        <header className="hidden md:flex px-5 py-4 border-b border-gray-100 gap-1 justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <h2 className="font-semibold text-lg text-gray-800">Book Shelf <span className="text-gray-500">({books.length})</span></h2>
                                <div className="flex items-center gap-3 bg-white rounded-md border border-2 px-2 py-1">
                                    <BiSearch />
                                    <input
                                        type="search"
                                        className="w-full bg-transparent border-none focus:outline-none "
                                        placeholder="Search by title or author"
                                        onChange={(e) => setSearchString(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="bg-everyblue py-2 px-4 rounded-lg text-white" onClick={() => {
                                setId(null);
                                setSelectedBook();
                                setShowNewBookModal(true)
                            }}>Add Book</button>
                        </header>
                        <div className="px-5 py-3 flex gap-4 flex-wrap w-full">
                            {isLoading ? (
                                <div className="w-full flex justify-center items-center">
                                    <LoaderSpinner />
                                </div>
                            ) : books.map((book) => (
                                <div
                                    onClick={() => {
                                        setShowNewBookModal(true)
                                        setId(book._id)
                                        setSelectedBook(book)
                                    }}
                                    className="h-fit text-white bg-gray-600 flex flex-col gap-1 p-2 rounded-lg grow max-w-rt cursor-pointer">
                                    <div className="w-full h-24">
                                        {book.cover && <img src={book.cover} alt="cover" className="object-contain w-full h-full" />}
                                    </div>
                                    <h2 className="font-semibold">{book.title}</h2>
                                    <h3 className="text-sm">{book.author}</h3>
                                    <h3 className="text-sm">{book.endDate && dayjs(book.endDate).format("MMMM DD, YYYY")}</h3>
                                    <ReactStars
                                        edit={false}
                                        value={book.rating}
                                        isHalf={true}
                                        size={20}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {showNewBookModal && <AddNewBookModal setShowModal={setShowNewBookModal} id={Id} book={selectedBook} />}
        </div>
    )
}

export default ReadingTracker;