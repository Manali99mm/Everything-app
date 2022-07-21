import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { getToken } from "../Utilities/getToken";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const AddMovieModal = ({ setOpenModal, type }) => {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full  my-6 mx-auto max-w-2xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add {type === "movie" ? "Movie" : "Series"}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setOpenModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    X
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <Formik
                            initialValues={{
                                type: type,
                                title: "",
                                rating: 0,
                                seasonsWatched: null,
                                totalSeasons: null
                            }}
                            onSubmit={(values) => {
                                axios.post("http://localhost:4000/movser/watched/add", values, {
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
                                            <div className="relative w-full mt-2 space-y-6 px-6 py-4">
                                                <div class="relative">
                                                    <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        placeholder={`${type === 'movie' ? 'Iron Man' : 'F.R.I.E.N.D.S'}`}
                                                    />
                                                </div>
                                                {type === "series" && <div className="flex gap-4"
                                                >
                                                    <div class="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Seasons Watched</label>
                                                        <input
                                                            type="text"
                                                            name="seasonsWatched"
                                                            value={values.seasonsWatched}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                            placeholder={"5"}
                                                        />
                                                    </div>
                                                    <div class="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Total Seasons</label>
                                                        <input
                                                            type="text"
                                                            name="totalSeasons"
                                                            value={values.totalSeasons}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                            placeholder={"10"}
                                                        />
                                                    </div>
                                                </div>}
                                                <div>
                                                    <div className="px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Rating</div>
                                                    <div className="px-4">
                                                        <ReactStars
                                                            onChange={(newRating) => setFieldValue("rating", newRating)}
                                                            count={5}
                                                            isHalf={true}
                                                            edit={true}
                                                            size={28}
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
                                                    onClick={() => setOpenModal(false)}
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

export default AddMovieModal;