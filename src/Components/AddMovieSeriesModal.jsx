import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import LoaderSpinner from "./LoaderSpinner";

const AddMovieSeriesModal = ({ setOpenModal, id }) => {
    const [initialValues, setInitialValues] = React.useState({
        type: "series",
        movieTitle: "",
        seriesTitle: "",
        currSeason: null,
        totalSeasons: null,
        currEpisode: null,
        totalEpisodes: null
    });
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            axios.get(`/movser/curr/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then((res => {
                    const { type, movieTitle, seriesTitle, currEpisode, currSeason, totalEpisodes, totalSeasons } = res.data;
                    setInitialValues({
                        type,
                        movieTitle,
                        seriesTitle,
                        currEpisode,
                        currSeason,
                        totalEpisodes,
                        totalSeasons
                    })
                    setIsLoading(false);
                }))
                .catch((err) => console.log(err));
        }
    }, [id])

    const deleteItem = () => {
        axios.delete(`/movser/curr/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setOpenModal(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full  my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {id ? "Edit" : "Add"} Movie/Series
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
                                    axios.post("/movser/curr/add", { ...values, id }, {
                                        headers: {
                                            Authorization: `Bearer ${getToken()}`
                                        }
                                    })
                                        .then((res) => {
                                            console.log(res.data);
                                            setOpenModal(false)
                                        })
                                        .catch((err) => console.log(err))

                                }}
                            >
                                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                    <>
                                        <div className="relative flex-auto">
                                            <form className="relative w-full" onSubmit={handleSubmit}>
                                                <div className={`${id && "hidden"} flex gap-4 mt-2 px-6 pt-2`}>
                                                    <div
                                                        onClick={() => setFieldValue("type", "series")}
                                                        className={`cursor-pointer px-4 py-2 ${values.type === 'series' ? "bg-everyblue text-white" : "bg-white border-2 border-black"} font-semibold rounded-lg`}>Series</div>
                                                    <div
                                                        onClick={() => setFieldValue("type", "movie")}
                                                        className={`cursor-pointer px-4 py-2 ${values.type === 'movie' ? "bg-everyblue text-white" : "bg-white border-2 border-black"}  font-semibold rounded-lg`}>Movie</div>
                                                </div>
                                                {values.type === "movie" ? (
                                                    <div className="relative w-full mt-2 space-y-6 px-6 py-3">
                                                        <div class="relative">
                                                            <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Title</label>
                                                            <input
                                                                type="text"
                                                                name="movieTitle"
                                                                value={values.movieTitle}
                                                                onChange={handleChange}
                                                                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                                placeholder="Captain America"
                                                            />
                                                        </div>

                                                    </div>
                                                ) : (
                                                    <div className="relative w-full mt-2 space-y-6 px-6 py-3">
                                                        <div class="relative">
                                                            <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Title</label>
                                                            <input
                                                                type="text"
                                                                name="seriesTitle"
                                                                value={values.seriesTitle}
                                                                onChange={handleChange}
                                                                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                                placeholder="Friends"
                                                            />
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div class="relative w-1/2">
                                                                <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Current Season</label>
                                                                <input
                                                                    type="text"
                                                                    name="currSeason"
                                                                    value={values.currSeason}
                                                                    onChange={handleChange}
                                                                    className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                                    placeholder="2"
                                                                />
                                                            </div>
                                                            <div class="relative w-1/2">
                                                                <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Total Seasons</label>
                                                                <input
                                                                    type="text"
                                                                    name="totalSeasons"
                                                                    value={values.totalSeasons}
                                                                    onChange={handleChange}
                                                                    className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                                    placeholder="10"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div class="relative w-1/2">
                                                                <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Current Episode</label>
                                                                <input
                                                                    type="text"
                                                                    name="currEpisode"
                                                                    value={values.currEpisode}
                                                                    onChange={handleChange}
                                                                    className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                                    placeholder="4"
                                                                />
                                                            </div>
                                                            <div class="relative w-1/2">
                                                                <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Total Episodes</label>
                                                                <input
                                                                    type="text"
                                                                    name="totalEpisodes"
                                                                    value={values.totalEpisodes}
                                                                    onChange={handleChange}
                                                                    className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                                    placeholder="24"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
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

export default AddMovieSeriesModal;