import { Formik } from "formik";
import React from "react";

const AddBookModal = ({ setOpenBookModal }) => {
    const [selectedOption, setSelectedOption] = React.useState(null);
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-full  my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add Book
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setOpenBookModal(false)}
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
                                chapter: "",
                                duration: "",
                                pagesRead: 0,
                                totalPages: 0,
                                percentProgress: 0,
                                startDate: ""
                            }}
                            onSubmit={(values) => {
                                alert(JSON.stringify(values, 2));
                            }}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <>
                                    <div className="relative flex-auto">
                                        <form className="relative w-full" onSubmit={handleSubmit}>
                                            <div className="relative w-full mt-2 space-y-6 p-6">
                                                <div class="relative">
                                                    <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Book Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={values.title}
                                                        onChange={handleChange}
                                                        className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        placeholder="The Alchemist"
                                                    />
                                                </div>
                                                <div class="relative">
                                                    <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Current Chapter</label>
                                                    <input
                                                        type="text"
                                                        name="chapter"
                                                        value={values.chapter}
                                                        onChange={handleChange}
                                                        className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        placeholder="5"
                                                    />
                                                </div>
                                                <div className="relative flex gap-5">
                                                    <div className="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Start Date</label>
                                                        <input
                                                            type="date"
                                                            name="startDate"
                                                            value={values.startDate}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                        />
                                                    </div>
                                                    <div className="relative w-1/2">
                                                        <label className="absolute px-2 ml-2 -mt-2 font-medium text-gray-600 bg-white">Total Duration</label>
                                                        <input
                                                            type="text"
                                                            name="duration"
                                                            value={values.duration}
                                                            onChange={handleChange}
                                                            className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                                            placeholder="1 hr 32 mins"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="relative flex flex-col">
                                                    <label className=" px-2 ml-2 font-medium text-gray-600 bg-white">Progress</label>
                                                    <div className="flex gap-4 ml-4 mt-2">
                                                        <div className="flex gap-1">
                                                            <input
                                                                type="radio"
                                                                value="pages"
                                                                checked={selectedOption === "pages"}
                                                                onChange={() => setSelectedOption("pages")}
                                                            />Pages
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <input
                                                                type="radio"
                                                                value="percent"
                                                                checked={selectedOption === "percent"}
                                                                onChange={() => setSelectedOption("percent")}
                                                            />Per cent
                                                        </div>
                                                    </div>
                                                    {selectedOption === "pages" && <p className="ml-4 mt-4">On Page <input type="text" name="pagesRead" onChange={handleChange} className="border-b mx-2 w-24 border-gray-500 focus:ring-0 focus:outline-none text-center" placeholder="#" /> of <input type="text" name="totalPages" onChange={handleChange} className="border-b mx-2 w-24 border-gray-500 focus:ring-0 focus:outline-none text-center" placeholder="#" /></p>}
                                                    {selectedOption === "percent" && <p className="ml-4 mt-4"><input type="text" name="percentProgress" onChange={handleChange} className="border-b w-24 border-gray-500 focus:ring-0 focus:outline-none text-center" placeholder="#" />  % done</p>}
                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setOpenBookModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="submit"
                                                // onClick={() => setOpenBookModal(false)}
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

export default AddBookModal;