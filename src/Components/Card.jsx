import React from "react";

const Card = ({ title, img }) => {
    return (
        <div className="bg-white p-5 w-80 h-52 rounded-lg mb-2 cursor-pointer hover:opacity-90 shadow-xl">
            <img src={img} alt="books" className="-mt-10 rounded-lg mb-4" />
            <h1 className="text-xl font-semibold">{title}</h1>
        </div>
    )
}

export default Card;