import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import LoaderSpinner from "./LoaderSpinner";

const AddMovieModal = ({ setOpenModal, type, id }) => {
    const [initialValues, setInitialValues] = React.useState({
        type: type,
        title: "",
        rating: 0,
        seasonsWatched: null,
        totalSeasons: null
    })
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            axios.get(`https://everything-apis.herokuapp.com/movser/watched/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    const { type, movieTitle, seriesTitle, movieRating, seriesRating, totalSeasons, seasonsWatched } = res.data;
                    setInitialValues({
                        type,
                        title: type === "movie" ? movieTitle : seriesTitle,
                        seasonsWatched,
                        totalSeasons,
                        rating: type === "movie" ? movieRating : seriesRating
                    });
                    setIsLoading(false)
                })
                .catch((err) => console.log(err));
        }
    }, [id])

    const deleteItem = () => {
        axios.delete(`https://everything-apis.herokuapp.com/movser/watched/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setOpenModal(false)
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
                                {id ? "Edit" : "Add"} {type === "movie" ? "Movie" : "Series"}
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
                        {isLoading ? (
                            <div className="flex justify-center p-8">
                                <LoaderSpinner />
                            </div>
                        ) : (
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    axios.post("https://everything-apis.herokuapp.com/movser/watched/add", { ...values, id }, {
                                        headers: {
                                            Authorization: `Bearer ${getToken()}`
                                        }
                                    })
                                        .then((res) => {
                                            console.log(res.data);
                                            setOpenModal(false)
                                        })
                                        .catch((err) => console.log(err));
                                }}
                            >
                                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                    <>
                                        <div className="relative flex-auto">
                                            <form className="relative w-full" onSubmit={handleSubmit}>
                                                <div className="relative w-full mt-2 space-y-6 px-6 py-4">
                                                    <div className="relative">
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
                                                        <div className="relative w-1/2">
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
                                                        <div className="relative w-1/2">
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
                                                                value={values.rating}
                                                                key={values.rating}
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
                                                    {id ? (
                                                        <button
                                                            onClick={deleteItem}
                                                            className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            Delete
                                                        </button>
                                                    ) : (

                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setOpenModal(false)}
                                                        >
                                                            Close
                                                        </button>
                                                    )}
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
                        )}

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AddMovieModal;