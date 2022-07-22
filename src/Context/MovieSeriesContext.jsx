import React from "react";

export const MovieSeriesContext = React.createContext();

const MovieSeriesProvider = ({ children }) => {
    const [type, setType] = React.useState("currwatch");

    return (
        <MovieSeriesContext.Provider value={{ type, setType }}>
            {children}
        </MovieSeriesContext.Provider>
    )
}

export default MovieSeriesProvider;