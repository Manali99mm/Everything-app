import axios from "axios";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import AddMovieSeriesModal from "./AddMovieSeriesModal";
import { CgAdd } from "react-icons/cg";

const CurrentlyWatching = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [currWatching, setCurrwatching] = React.useState([]);
    const [Id, setId] = React.useState();

    useEffect(() => {
        axios.get("https://everything-apis.herokuapp.com/movser/curr/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setCurrwatching(res.data.list);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <div className="px-12 pb-8 flex pt-6 flex-wrap gap-8">
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
                {currWatching.map((cw) => (
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
            {openModal && <AddMovieSeriesModal setOpenModal={setOpenModal} id={Id} />}
        </>
    )
}

export default CurrentlyWatching;