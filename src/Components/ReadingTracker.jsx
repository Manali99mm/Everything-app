import React, { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai"
import AddBookModal from "./AddBookModal";
import axios from "axios";
import { getToken } from "../Utilities/getToken";
import dayjs from "dayjs";
import AddNewBookModal from "./AddNewBookModal";
import ReactStars from "react-rating-stars-component";

const ReadingTracker = () => {
    const [openBookModal, setOpenBookModal] = React.useState(false);
    const [currentReads, setCurrentReads] = React.useState([]);
    const [showNewBookModal, setShowNewBookModal] = React.useState(false);
    const [Id, setId] = React.useState();
    const [books, setBooks] = React.useState([]);
    const [selectedBook, setSelectedBook] = React.useState();

    useEffect(() => {
        axios.get("https://everything-apis.herokuapp.com/cr/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setCurrentReads(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        axios.get("https://everything-apis.herokuapp.com/book/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, [])

    const deleteBook = (id) => {
        axios.delete(`https://everything-apis.herokuapp.com/cr/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl uppercase font-semibold text-gray-600 px-8">Reading Tracker</h1>
            <section className="w-full antialiased text-gray-600 md:px-8 py-6">
                <div className="flex flex-col justify-start h-full">
                    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center gap-1">
                            <h2 className="font-semibold text-gray-800 text-lg">Currently Reading <span className="text-gray-500">({currentReads.length})</span></h2>
                            <button className="bg-everyblue py-2 px-4 rounded-lg text-white" onClick={() => {
                                setId(null);
                                setOpenBookModal(true)
                            }}>Add Book</button>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">#</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap w-1/4">
                                                <div className="font-semibold text-left">Book Title</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Chapter</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Date Started</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Progress</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Action</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {currentReads.map((cr) => (
                                            <tr>
                                                <td className="p-2">{cr.sno}</td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="font-medium text-gray-800">{cr.title}</div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-center">{cr.chapter}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">{dayjs(cr.startDate).format("DD MMM, YYYY")}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap w-32">
                                                    <div className="flex items-center gap-1 justify-center">
                                                        <div className="w-full bg-gray-200 rounded-full">
                                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${cr.progress}%` }}></div>
                                                        </div>
                                                        <div>{Math.round(cr.progress)}%</div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap ">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div
                                                            onClick={() => {
                                                                setOpenBookModal(true)
                                                                setId(cr._id)
                                                            }}
                                                            className="text-lg text-center cursor-pointer">
                                                            <MdModeEdit size={20} />
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                deleteBook(cr._id)
                                                            }}
                                                            className="text-lg text-center cursor-pointer">
                                                            <AiTwotoneDelete size={20} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Book Shelf */}
            <section className="w-full antialiased text-gray-600 md:px-8 py-6">
                <div className="flex flex-col justify-start h-full">
                    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100 flex gap-1 justify-between items-center">
                            <h2 className="font-semibold text-lg text-gray-800">Book Shelf <span className="text-gray-500">({books.length})</span></h2>
                            <button className="bg-everyblue py-2 px-4 rounded-lg text-white" onClick={() => {
                                setId(null);
                                setSelectedBook();
                                setShowNewBookModal(true)
                            }}>Add Book</button>
                        </header>
                        <div className="px-5 py-3 flex gap-4 flex-wrap w-full">
                            {books.map((book) => (
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

            {openBookModal && <AddBookModal setOpenBookModal={setOpenBookModal} id={Id} />}
            {showNewBookModal && <AddNewBookModal setShowModal={setShowNewBookModal} id={Id} book={selectedBook} />}
        </div>
    )
}

export default ReadingTracker;