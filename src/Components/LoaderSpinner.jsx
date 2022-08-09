import React from "react";
import { TailSpin } from "react-loader-spinner"

const LoaderSpinner = () => {
    return (
        <TailSpin
            color="#0d67b5"
            height={40}
            width={40}
        />
    )
}

export default LoaderSpinner;