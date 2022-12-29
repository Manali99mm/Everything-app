import { Formik } from "formik";
import React from "react";
import logo from "../assets/logo-transparent.png";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import SignUp from "../assets/Signup.png";

const Register = () => {
    const [error, setError] = React.useState();
    const navigate = useNavigate();

    const googleSignUp = () => (window.location.href = "https://puzzling-agreeable-borogovia.glitch.me/auth/google")

    return (
        <>
            <div className="w-full h-screen lg:flex">
                <div className="hidden lg:block bg-everyblue w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
                    <img src={SignUp} alt="signup" className="text-center" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                    <img src={logo} alt="logo" height="120px" width="120px" />
                    <Formik
                        initialValues={{
                            credentials: {
                                name: "",
                                email: "",
                                password: ""
                            }
                        }}
                        onSubmit={(values) => {
                            axios.post("/auth/signup", values)
                                .then((res) => {
                                    console.log(res.data)
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
                                    type={"text"}
                                    name="credentials.name"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    value={values.credentials.name}
                                />
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
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button type="submit" className="bg-everyblue text-white py-2 rounded-lg">Sign Up</button>
                                <button onClick={googleSignUp} className="py-2 justify-center rounded-lg flex items-center gap-2 w-full border border-gray-400 bg-white text-gray-700 hover:bg-gray-100"><FcGoogle size={22} /> Sign up with Google</button>
                            </form>
                        )}
                    </Formik>
                    <h4 className="text-gray-500 text-sm my-5">Already a member? <Link to="/login" className="text-everyblue font-semibold">Login</Link></h4>
                </div>
            </div>
        </>
    )
}

export default Register;