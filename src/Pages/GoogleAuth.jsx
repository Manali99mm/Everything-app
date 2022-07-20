import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem("every-token", token);
            navigate("/");
        }
    }, [token])

    return (
        <>
            Loading..... Please Wait.
        </>
    )
}

export default GoogleAuth
