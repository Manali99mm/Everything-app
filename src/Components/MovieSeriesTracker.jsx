import React, { useContext } from "react";
import { MovieSeriesContext } from "../Context/MovieSeriesContext";
import CurrentlyWatching from "./CurrentlyWatching";
import MoviesWatched from "./MoviesWatched";
import SeriesWatched from "./SeriesWatched";

const MovieSeriesTracker = () => {
    // const [type, setType] = React.useState("currwatch");
    const { type, setType } = useContext(MovieSeriesContext);

    return (
        <div className="px-12">
            <div className="text-lg md:text-2xl font-semibold text-gray-600 py-4 flex items-center gap-2 uppercase">Movies / TV Series Tracker </div>
            <div className=" pt-6">
                <select
                    onChange={(e) => setType(e.target.value)}
                    defaultValue="currwatch"
                    value={type}
                    className="block p-2 mb-2 w-fit md:w-1/3 lg:w-1/4 text-lg  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="currwatch">Currently Watching</option>
                    <option value="moviesWatched">Movies I have watched</option>
                    <option value="seriesWatched">Series I have watched</option>
                </select>
                {type === "currwatch" && <CurrentlyWatching />}
                {type === "moviesWatched" && <MoviesWatched />}
                {type === "seriesWatched" && <SeriesWatched />}
            </div>

        </div>
    )
}

export default MovieSeriesTracker;