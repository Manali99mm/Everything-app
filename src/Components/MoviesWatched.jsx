import axios from "axios";
import React, { useEffect } from "react";
import { getToken } from "../Utilities/getToken";
import { CgAdd } from "react-icons/cg";
import AddMovieModal from "./AddMovieSeriesWatchedModal";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const MoviesWatched = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [Id, setId] = React.useState();

    useEffect(() => {
        axios.get("http://localhost:4000/movser/watched/movies/list", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setMovies(res.data.movies);
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
                {movies.map((movie) => (
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
            {openModal && <AddMovieModal setOpenModal={setOpenModal} type="movie" />}
        </>
    )
}

export default MoviesWatched;