import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo-transparent.png";
import LoginImg from "../assets/Login.png";

const Login = () => {
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const googleSignIn = () => (window.location.href = "https://puzzling-agreeable-borogovia.glitch.me/auth/google")

    return (
        <>
            <div className="w-full lg:flex h-screen">
                <div className="hidden lg:block bg-everyblue w-1/2 h-full lg:flex lg:flex-col lg:justify-center lg:items-center">
                    <img src={LoginImg} alt="signup" className="text-center" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                    <img src={logo} alt="logo" height="120px" width="120px" />
                    <h2 className="text-2xl font-semibold mb-7">Hello Again!</h2>
                    <Formik
                        initialValues={{
                            credentials: {
                                email: "",
                                password: ""
                            }
                        }}
                        onSubmit={(values) => {
                            axios.post("/auth/signin", values)
                                .then((res) => {
                                    localStorage.setItem("every-token", res.data.token);
                                    navigate("/");
                                })
                                .catch((err) => {
                                    setError(err.response.data.error)
                                });
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full px-8 md:px-16 lg:px-28">
                                <input
                                    className="p-2 bg-gray-50 rounded-sm border"
                                    type={"email"}
                                    name="credentials.email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={values.credentials.email}
                                />
                                <input
                                    className="p-2 bg-gray-50 rounded-sm border"
                                    type={"password"}
                                    name="credentials.password"
                                    onChange={handleChange}
                                    value={values.credentials.password}
                                    placeholder="Password"
                                />
                                {error && <p className="text-red-500">{error}</p>}
                                <button type="submit" className="bg-everyblue text-white py-2 rounded-lg">Login</button>
                                <button onClick={googleSignIn} className="py-2 justify-center rounded-lg flex items-center gap-2 w-full border border-gray-400 bg-white text-gray-700 hover:bg-gray-100"><FcGoogle size={22} /> Sign in with Google</button>
                            </form>
                        )}
                    </Formik>
                    <h4 className="text-gray-500 text-sm my-5">Don't have an account yet? <Link to="/register" className="text-everyblue font-semibold"> Sign Up</Link></h4>
                </div>
            </div>
        </>
    )
}

export default Login;