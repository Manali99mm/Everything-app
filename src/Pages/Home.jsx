import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/Navbar";
import SidebarNav from "../Components/SideBarNav";
import Dashboard from "../Components/Dashboard";
import ReadingTracker from "../Components/ReadingTracker";
import TBR from "../Components/TBR";
import MovieSeriesTracker from "../Components/MovieSeriesTracker";

const Home = () => {
    const { type } = useParams();
    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <div className="w-full flex h-11/12">
                <SidebarNav />
                <div className="w-5/6 p-4 bg-gray-100">
                    {type === "dashboard" && <Dashboard />}
                    {type === "reading-tracker" && <ReadingTracker />}
                    {type === "read-challenge" && <Dashboard />}
                    {type === "tbr" && <TBR />}
                    {type === "quotes" && <Dashboard />}
                    {type === "series-tracker" && <MovieSeriesTracker />}
                </div>
            </div>
            {/* <div className=" h-full flex flex-row gap-10 flex-wrap p-10 pt-16 justify-center">
            <Card title={"Reading Tracker"} img={books} />
            <Card title={"Reading Challenge"} img={books} />
            <Card title={"TBR List"} img={books} />
            <Card title={"Movie/Series Tracker"} img={books} />
            <Card title={"Quotes from Books"} img={books} />
        </div> */}
        </div>
    )
}

export default Home;