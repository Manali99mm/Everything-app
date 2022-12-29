import axios from "axios";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import AddMovieSeriesModal from "./AddMovieSeriesModal";
import { CgAdd } from "react-icons/cg";
import LoaderSpinner from "./LoaderSpinner";
import { BiSearch } from "react-icons/bi";

const CurrentlyWatching = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [currWatching, setCurrwatching] = React.useState([]);
    const [Id, setId] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [searchString, setSearchString] = React.useState("");

    useEffect(() => {
        setIsLoading(true)
        axios.get("/movser/curr/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                setCurrwatching(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [refresh])

    useEffect(() => {
        setIsLoading(true)
        axios.get("/movser/curr/search", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: {
                searchString
            }
        })
            .then((res) => {
                setIsLoading(false)
                setCurrwatching(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [searchString])

    return (
        <>
            <div className="flex items-center gap-3 bg-white rounded-md border border-black px-2 py-2 mt-3 md:w-1/2">
                <BiSearch />
                <input
                    type="search"
                    className="w-full bg-transparent border-none focus:outline-none "
                    placeholder="Search..."
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
            <div className="pb-8 flex pt-6 flex-wrap gap-8">
                <div
                    onClick={() => {
                        setId(null)
                        setOpenModal(true)
                    }}
                    className="relative w-48 h-48 p-4 cursor-pointer hover:text-red-500"
                    style={{ backgroundImage: "url('https://www.nicepng.com/png/full/113-1137614_movie-cut-board-clipart-clapperboard-film-clip-art.png')", backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
                >
                    <div className="absolute top-28 left-20">
                        <CgAdd size={30} />
                    </div>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center w-48 h-48">
                        <LoaderSpinner />
                    </div>
                ) : currWatching.map((cw) => (
                    <div
                        onClick={() => {
                            setOpenModal(true)
                            setId(cw._id)
                        }}
                        className="relative w-48 h-48  cursor-pointer"
                        style={{ backgroundImage: "url('https://www.nicepng.com/png/full/113-1137614_movie-cut-board-clipart-clapperboard-film-clip-art.png')", backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
                    >
                        {cw.type === "series" ? (
                            <div className="absolute top-20 px-4 flex flex-col">
                                <h1 className=" text-lg font-bold line-clamp-2">{cw.seriesTitle}</h1>
                                <h2 className=" text-base font-semibold">Season {cw.currSeason} {cw.totalSeasons && (`of ${cw.totalSeasons}`)}</h2>
                                <h2 className=" text-base font-semibold">Episode {cw.currEpisode} {cw.totalEpisodes && (`of ${cw.totalEpisodes}`)}</h2>
                            </div>
                        ) : (
                            <div className="absolute top-20 px-4 flex flex-col">
                                <h1 className=" text-lg font-bold line-clamp-2">{cw.movieTitle}</h1>
                            </div>
                        )}
                    </div>
                ))}

            </div>
            {openModal && <AddMovieSeriesModal setOpenModal={setOpenModal} id={Id} setRefresh={setRefresh} refresh={refresh} />}
        </>
    )
}

export default CurrentlyWatching;