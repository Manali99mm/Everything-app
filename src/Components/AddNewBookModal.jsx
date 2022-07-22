import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { getToken } from "../Utilities/getToken";

const AddNewBookModal = ({ setShowModal }) => {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full  my-6 mx-auto max-w-2xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add New Book
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
                        <Formik
                            initialValues={{
                                title: "",
                                author: "",
                                image: null,
                                startDate: Date.now(),
                                endDate: Date.now(),
                                rating: 0,
                                category: [],
                                publicationYear: ""
                            }}
                            onSubmit={(values) => {
                                console.log(values)
                                axios.postForm("http://localhost:4000/book/new", values, {
                                    headers: {
                                        Authorization: `Bearer ${getToken()}`
                                    }
                                })
                                    .then((res) => {
                                        console.log(res.data);
                                        window.location.reload();
                                    })
                                    .catch((err) => console.log(err));
                            }}
                        >
                            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                <>
                                    <div className="relative flex-auto">
                                        <form className="relative w-full" onSubmit={handleSubmit}>
                                            <div className="relative w-full mt-2 space-y-4 px-6 py-2">
                                                <div >
                                                    <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Cover</label>
                                                    <input
                                                        className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        type="file"
                                                        name="image"
                                                        onChange={(ev) => {
                                                            setFieldValue("image", ev.currentTarget.files[0])
                                                        }}
                                                    />

                                                </div>
                                                <div class="relative">
                                                    <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        placeholder="The Alchemist"
                                                    />
                                                </div>
                                                <div className="flex gap-4">
                                                    <div class="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Author</label>
                                                        <input
                                                            type="text"
                                                            name="author"
                                                            value={values.author}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                            placeholder="Paulo Coelho"
                                                        />
                                                    </div>
                                                    <div class="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Publication Year</label>
                                                        <input
                                                            type="text"
                                                            name="publicationYear"
                                                            value={values.publicationYear}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                            placeholder="1988"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="relative flex gap-5">
                                                    <div className="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Start Date</label>
                                                        <input
                                                            type="date"
                                                            name="startDate"
                                                            value={values.startDate}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        />
                                                    </div>
                                                    <div className="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">End Date</label>
                                                        <input
                                                            type="date"
                                                            name="endDate"
                                                            value={values.endDate}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Rating</div>
                                                    <div className="px-4">
                                                        <ReactStars
                                                            onChange={(newRating) => setFieldValue("rating", newRating)}
                                                            count={5}
                                                            isHalf={true}
                                                            edit={true}
                                                            size={28}
                                                            value={values.rating}
                                                            emptyIcon={<FaRegStar />}
                                                            halfIcon={<FaStarHalfAlt />}
                                                            fullIcon={<FaStar />}
                                                            activeColor="#ffd700"
                                                        />
                                                    </div>
                                                </div>
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
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AddNewBookModal;