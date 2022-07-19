import { Formik } from "formik";
import React from "react";
import logo from "../assets/logo-transparent.png";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const googleSignIn = () => (window.location.href = "http://localhost:4000/auth/google")

    return (
        <>
            {/* Large screen */}
            <div className="w-full hidden lg:block lg:flex lg:flex-row h-full">
                <div className="bg-everyblue w-1/2 h-screen">
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center">
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
                            console.log(values)
                            axios.post("http://localhost:4000/auth/signin", values)
                                .then((res) => {
                                    // console.log(res);
                                    localStorage.setItem("every-token", res.data.token);
                                    navigate("/");
                                })
                                .catch((err) => console.log(err));
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full px-28">
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
                                <Link to="/register" className="text-sm text-everyblue font-semibold">Forgot password?</Link>
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