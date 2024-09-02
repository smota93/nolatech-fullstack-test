import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
} from "react-router-dom";
import { register } from '../redux/registerSlicer'

const SignUp = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")

  const registerState = useSelector(state => state.register)

  const handleSubmit = async () => {
    await dispatch(register({username, password, role}))
  }

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-600">
                Sign up
              </h1>
            </div>
            <div className="w-full flex-1 mt-4">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <div className="mt-4">
                  <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    autoComplete="off"
                    onChange={(e) => (setUsername(e.target.value))}
                    value={username}
                    required
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="border rounded-md p-4 w-full mx-auto max-w-2xl">
                  <h6 className="text-sm lg:text-md font-bold text-gray-700 ">
                    Role
                  </h6>

                  <div>
                    <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-blue-300  cursor-pointer">
                      <input type="radio" name="Role" onClick={() => setRole('employee')} value={role}/>
                      <i className="pl-2">Employee</i>
                    </label>

                    <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-blue-300  cursor-pointer">
                      <input type="radio" name="Role" onClick={() => setRole('manager')} value={role}/>
                      <i className="pl-2">Manager</i>
                    </label>

                    <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-blue-300 cursor-pointer">
                      <input type="radio" name="Role" onClick={() => setRole('admin')} value={role}/>
                      <i className="pl-2">Admin</i>
                    </label>
                  </div>
                </div>
                <button className="mt-5 py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
                onClick={ handleSubmit } disabled={ registerState.isLoading }>
                  { 
                    registerState.isLoading  
                      ? <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                        </path>
                      </svg>
                      : <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                  }
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Already have an account?{" "}
                  <Link to="/sign-in">
                    <span className="text-blue-700 font-semibold">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;