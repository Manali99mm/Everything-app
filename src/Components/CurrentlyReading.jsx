import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { getToken } from "../Utilities/getToken";
import AddCRModal from "./AddCRModal";
import { TailSpin } from "react-loader-spinner";
import { BiSearch } from "react-icons/bi";

const CurrentlyReading = () => {
    const [currentReads, setCurrentReads] = React.useState([]);
    const [Id, setId] = React.useState();
    const [openBookModal, setOpenBookModal] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [searchString, setSearchString] = React.useState("");

    useEffect(() => {
        setIsLoading(true)
        axios.get("/cr/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                setCurrentReads(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [refresh])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/cr/search`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: {
                searchString
            }
        })
            .then((res) => {
                setIsLoading(false)
                setCurrentReads(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [searchString])

    const deleteBook = (id) => {
        axios.delete(`/cr/delete/${id}`, {
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
        <>
            <section className="w-full antialiased text-gray-600 md:px-8 py-6">
                <div className="flex flex-col justify-start h-full">
                    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
                        {/*header for mobile screens*/}
                        <header className="md:hidden px-5 py-4 border-b border-gray-100 ">
                            <div className="flex justify-between items-center gap-1">
                                <h2 className="font-semibold text-gray-800 text-lg">Currently Reading <span className="text-gray-500">({currentReads.length})</span></h2>
                                <button className="bg-everyblue py-2 px-4 rounded-lg text-white" onClick={() => {
                                    setId(null);
                                    setOpenBookModal(true)
                                }}>Add Book</button>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-md border border-2 px-2 py-1 mt-3 ">
                                <BiSearch />
                                <input
                                    type="search"
                                    className="w-full bg-transparent border-none focus:outline-none "
                                    placeholder="Search by title"
                                    value={searchString}
                                    onChange={(e) => setSearchString(e.target.value)}
                                />
                            </div>
                        </header>
                        {/*header for medium and large screens*/}
                        <header className="hidden md:flex px-5 py-4 border-b border-gray-100 justify-between items-center gap-1">
                            <div className="flex gap-4 items-center">
                                <h2 className="font-semibold text-gray-800 text-lg">Currently Reading <span className="text-gray-500">({currentReads.length})</span></h2>
                                <div className="flex items-center gap-3 bg-white rounded-md border border-2 px-2 py-1">
                                    <BiSearch />
                                    <input
                                        type="search"
                                        className="w-full bg-transparent border-none focus:outline-none "
                                        placeholder="Search by title"
                                        value={searchString}
                                        onChange={(e) => setSearchString(e.target.value)}
                                    />
                                </div>
                            </div>
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
                                        {isLoading ? (
                                            <div className="flex justify-center w-full">
                                                <TailSpin
                                                    color="#0d67b5"
                                                    height={40}
                                                    width={40}
                                                />
                                            </div>
                                        ) : currentReads.map((cr) => (
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
            {openBookModal && <AddCRModal setOpenBookModal={setOpenBookModal} id={Id} setRefresh={setRefresh} refresh={refresh} />}
        </>
    )
}

export default CurrentlyReading