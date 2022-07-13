import { Formik } from "formik";
import React from "react";
import logo from "../assets/logo-transparent.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    return (
        <>
            {/* Large screen */}
            <div className="w-full hidden md:block md:flex md:flex-row">
                <div className="bg-everyblue w-1/2 h-screen"></div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <img src={logo} alt="logo" height="120px" width="120px" />
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: ""
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:px-16 lg:px-28">
                                <input
                                    className="p-2 bg-gray-50 rounded-sm border"
                                    type={"text"}
                                    name="name"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    value={values.name}
                                />
                                <input
                                    className="p-2 bg-gray-50 rounded-sm border"
                                    type={"email"}
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <input
                                    className="p-2 bg-gray-50 rounded-sm border"
                                    type={"password"}
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    placeholder="Password"
                                />
                                <button type="submit" className="bg-everyblue text-white py-2 rounded-lg">Sign Up</button>
                                <button className="py-2 justify-center rounded-lg flex items-center gap-2 w-full border border-gray-400 bg-white text-gray-700 hover:bg-gray-100"><FcGoogle size={22} /> Sign up with Google</button>
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