import React, { useEffect } from "react";
import CurrentlyReading from "./CurrentlyReading";
import CurrentlyWatching from "./CurrentlyWatching";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import axios from "axios";
import { getToken } from "../Utilities/getToken";
import dayjs from "dayjs";
import LoaderSpinner from "./LoaderSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [booksReadThisYear, setBooksReadThisYear] = React.useState(0);
    const [booksReadLastYear, setBooksReadLastYear] = React.useState(0);
    const [name, setName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get("https://everything-apis.herokuapp.com/book/dashboard", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                setIsLoading(false)
                const { result, user } = res.data;
                setName(user);
                result.forEach((r) => {
                    if (r._id === dayjs().get("year")) {
                        setBooksReadThisYear(r.total)
                    } else if (r._id === dayjs().add(-1, "year").get("year")) {
                        setBooksReadLastYear(r.total);
                    }
                })
            })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const data = {
        labels: ['Books Read This Year', 'Book Read Last Year'],
        datasets: [
            {
                label: 'Books read this year and last year',
                data: [booksReadThisYear, booksReadLastYear],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4 lg:px-8 md:py-4">
            <h1 className="text-xl md:text-2xl text-gray-700 font-semibold md:px-8">Hello {name}!</h1>
            {isLoading ? (
                <div className="p-4 w-full justify-center flex">
                    <LoaderSpinner />
                </div>
            ) : (booksReadLastYear > 0 || booksReadThisYear > 0) && (
                <div className="w-64 md:w-1/2 lg:w-1/3 md:px-8 mt-8">
                    <Pie options={options} data={data} />
                </div>
            )}
            <div>
                <CurrentlyReading />
            </div>
            <div className="py-4 px-8">
                <h1 className="font-semibold text-gray-600 text-lg uppercase ">Currently Watching</h1>
                <CurrentlyWatching />
            </div>
        </div>
    )
}

export default Dashboard;