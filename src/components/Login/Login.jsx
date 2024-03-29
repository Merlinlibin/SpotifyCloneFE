import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { userActor } from "../../states/Actors/UserActor";
import { Oval } from "react-loader-spinner";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const eyeref = useRef("");
  const passref = useRef("");

  const togglepass = () => {
    if (
      passref.current.type == "password" &&
      eyeref.current.className == "bi bi-eye-slash eye"
    ) {
      passref.current.type = "text";
      eyeref.current.className = "bi bi-eye eye";
    } else {
      passref.current.type = "password";
      eyeref.current.className = "bi bi-eye-slash eye";
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setloading(true);
    const { password, username } = userDetails;
    let d = JSON.stringify({
      password,
      username,
    });
    console.log(d);
    const res = await fetch(
      "https://spotifyclonebackend.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: d,
      }
    );
    const data = await res.json();
    if (data.success) {
      console.log(data);
      toast.success(data.message);
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(userActor(data.user));
      setloading(false);
      navigate("/");
    } else {
      toast.error(data.message);
      setloading(false);
    }
  };
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <header className="px-12 py-8">
        <div className="logo">
          <Link to="/">
            <img src="/assets/white_logo.png" width={120} alt="" />
          </Link>
        </div>
      </header>
      <div className="bg-[#1a1919] py-10 w-full">
        <div className="bg-black py-10 text-center w-9/12 md:w-1/2 mx-auto">
          <h1 className="text-5xl my-12 font-semibold">Log in to Spotify</h1>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <form onSubmit={loginUser} className="text-center mx-auto w-1/2 ">
            <div className="w-full text-left py-4">
              <label
                htmlFor="username"
                className="font-semibold mb-2 inline-block">
                Email 
              </label>
              <input
                required
                type="email"
                id="username"
                value={userDetails.username}
                onChange={onChange}
                name="username"
                placeholder="Email "
                className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
              />
            </div>
            <div className="w-full text-left py-4">
              <label
                htmlFor="password"
                className="font-semibold mb-2 inline-block">
                Password
              </label>
              <div className="pass">
                <input
                  required
                  type="password"
                  id="password"
                  value={userDetails.password}
                  ref={passref}
                  onChange={onChange}
                  name="password"
                  placeholder="Password"
                  className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
                />
                <i
                  className="bi bi-eye-slash eye"
                  ref={eyeref}
                  onClick={togglepass}></i>
              </div>
            </div>
            <div className="w-full text-left py-4">
              <button
                type="submit"
                placeholder="Password"
                className="block cursor-pointer w-full outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full ">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Oval color="white" height="25" width="25" />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="w-full text-center py-4">
              <Link
                to="/password/forgot"
                className="text-white font-semibold underline mx-auto">
                Forget Password?
              </Link>
            </div>
          </form>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <p className="pt-8">
            <span className="text-gray-300 font-semibold">
              Don't have an account?{" "}
            </span>

            <Link
              to="/signup"
              className="text-white hover:text-green-500 font-semibold underline mx-auto">
              Sign up for Spotify
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
