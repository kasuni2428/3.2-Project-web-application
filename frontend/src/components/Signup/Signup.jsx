// import { set } from "mongoose";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../style/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { RxAvatar } from "react-icons/rx";
import { server } from "../../server";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  // const [avatar, setAvatar] = useState(null);

  // const handleFileInputChange =(e)=>{
  //   const file = e.target.files[0];
  //   setAvatar(file);
  // };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const config = { header: { "Content-Type": "multipart-data" } };

    const newForm = new FormData();
    // newForm.append("file",avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        if (res.data.success === true) {
          navigate("/");
        }
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
          Create New Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="pace-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  requires
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border-gray-900 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-blue-800 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  requires
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border-gray-900 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-blue-800 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* password */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="mt-2 relative">
                <input
                  type={visible ? "text" : "password"} //if it is visible it will be text otherwise it will be password
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border-gray-900 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-blue-800 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div> */}

            {/* submit button  */}
            <div className="mt-8">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600"
              >
                Submit
              </button>
            </div>

            <div className="mt-4 ml-20">
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
