import axios from "axios";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import { CgAdd } from "react-icons/cg";
import AddMovieModal from "./AddMovieSeriesWatchedModal";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import LoaderSpinner from "./LoaderSpinner";

const MoviesWatched = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [Id, setId] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [searchString, setSearchString] = React.useState("");

    useEffect(() => {
        setIsLoading(true)
        axios.get("/movser/watched/movies/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                setMovies(res.data.movies);
            })
            .catch((err) => console.log(err));
    }, [refresh])

    useEffect(() => {
        setIsLoading(true)
        axios.get("/movser/watched/movies/search", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: { searchString }
        })
            .then((res) => {
                setIsLoading(false)
                setMovies(res.data.movies);
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
            <div className=" pb-8 flex pt-6 flex-wrap gap-8">
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
                ) : movies.map((movie) => (
                    <div
                        onClick={() => {
                            setOpenModal(true)
                            setId(movie._id)
                        }}
                        className="relative w-48 h-48  cursor-pointer"
                        style={{ backgroundImage: "url('https://www.nicepng.com/png/full/113-1137614_movie-cut-board-clipart-clapperboard-film-clip-art.png')", backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
                    >
                        <div className="absolute top-20 px-4 flex flex-col">
                            <h1 className=" text-lg font-bold line-clamp-2">{movie.movieTitle}</h1>
                        </div>
                        <div className="absolute bottom-1 px-4">
                            <ReactStars
                                value={movie.movieRating}
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
            {openModal && <AddMovieModal setOpenModal={setOpenModal} type="movie" id={Id} refresh={refresh} setRefresh={setRefresh} />}
        </>
    )
}

export default MoviesWatched;