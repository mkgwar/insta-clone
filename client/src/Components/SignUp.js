import { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../API/index";

const blankUser = { username: "", password: "" };

const SignUp = () => {
  const [showError, setshowError] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);
  const [userData, setuserData] = useState(blankUser);
  const [displayMessage, setdisplayMessage] = useState("");
  const [isUsernameCorrect, setisUsernameCorrect] = useState(false);
  const [isPasswordCorrect, setisPasswordCorrect] = useState(false);

  const usernameChange = (event) => {
    setshowSuccess(false);
    setshowError(false);

    setuserData({ ...userData, username: event.target.value });

    if (event.target.value.length >= 3) setisUsernameCorrect(true);
    else setisUsernameCorrect(false);
  };

  const passwordChange = (event) => {
    setshowSuccess(false);
    setshowError(false);
    setuserData({ ...userData, password: event.target.value });

    if (event.target.value.length >= 8) setisPasswordCorrect(true);
    else setisPasswordCorrect(false);
  };

  const signUp = async () => {
    const data = await api.signup(userData);

    if (data.status === "OK") {
      setshowSuccess(true);
      setshowError(false);
    } else if (data.status === "Error") {
      setshowError(true);
      setshowSuccess(false);
    }

    setuserData(blankUser);
    setisUsernameCorrect(false);
    setisPasswordCorrect(false);
    setdisplayMessage(data.message);
  };

  return (
    <div>
      <div className="p-8 bg-white flex flex-col items-center border-2 border-gray-200">
        <h1 className="text-3xl font-bold mb-8">
          <Link to="/">Insta Clone</Link>
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={usernameChange}
          className="px-4 py-2 bg-gray-50 border-2 border-gray-200 w-72 text-sm focus:outline-none rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={passwordChange}
          className="px-4 py-2 bg-gray-50 border-2 border-gray-200 w-72 text-sm focus:outline-none rounded-md mt-2"
        />
        <button
          className={
            "w-full py-1 rounded-md text-white font-bold mt-4 " +
            (isUsernameCorrect && isPasswordCorrect
              ? "bg-blue-500 pointer-events-auto"
              : "bg-blue-300 pointer-events-none")
          }
          onClick={signUp}
        >
          Sign Up
        </button>

        {showError && (
          <div className="mt-8 text-red-600 text-center">{displayMessage}</div>
        )}
        {showSuccess && (
          <div className="mt-8 text-center">
            <div className="text-green-600">{displayMessage}</div>
            <Link to="/signin" className=" text-blue-600">
              Log in
            </Link>
          </div>
        )}

        <div className="mt-8">
          Username: min 3 characters
          <br />
          Password: min 8 characters
        </div>
      </div>

      <div className="p-4 bg-white text-center mt-4 border-2 border-gray-200">
        Have an account?{" "}
        <Link to="/signin" className="text-blue-600">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
