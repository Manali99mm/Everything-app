import axios from "axios";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import { CgAdd } from "react-icons/cg";
import AddMovieModal from "./AddMovieSeriesWatchedModal";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import LoaderSpinner from "./LoaderSpinner";

const SeriesWatched = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [series, setSeries] = React.useState([]);
    const [Id, setId] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get("/movser/watched/series/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false);
                setSeries(res.data.series);
            })
            .catch((err) => console.log(err));
    }, [openModal])

    return (
        <>
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
                    <div className="flex justify-center w-48 h-48 items-center">
                        <LoaderSpinner />
                    </div>
                ) : series.map((s) => (
                    <div
                        onClick={() => {
                            setOpenModal(true)
                            setId(s._id)
                        }}
                        className="relative w-48 h-48  cursor-pointer"
                        style={{ backgroundImage: "url('https://www.nicepng.com/png/full/113-1137614_movie-cut-board-clipart-clapperboard-film-clip-art.png')", backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
                    >
                        <div className="absolute top-20 px-4 flex flex-col">
                            <h1 className=" text-lg font-bold line-clamp-2">{s.seriesTitle}</h1>
                            <h1 className="text-base">{s.seasonsWatched > 1 ? `S01-S${s.seasonsWatched < 10 ? `0${s.seasonsWatched}` : s.seasonsWatched}` : `S01`}</h1>
                        </div>
                        <div className="absolute bottom-1 px-4">
                            <ReactStars
                                value={s.seriesRating}
                                count={5}
                                isHalf={true}
                                edit={false}
                                size={32}
                                emptyIcon={<FaRegStar />}
                                halfIcon={<FaStarHalfAlt />}
                                fullIcon={<FaStar />}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                ))}

            </div>
            {openModal && <AddMovieModal setOpenModal={setOpenModal} type="series" id={Id} />}
        </>
    )
}

export default SeriesWatched;