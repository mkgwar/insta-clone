import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../API/index";

const blankUser = { username: "", password: "" };

const SignIn = () => {
  const [userData, setuserData] = useState(blankUser);
  const [showError, setshowError] = useState(false);
  const [displayMessage, setdisplayMessage] = useState("");
  const [isUsernameCorrect, setisUsernameCorrect] = useState(false);
  const [isPasswordCorrect, setisPasswordCorrect] = useState(false);
  const navigate = useNavigate();

  const usernameChange = (event) => {
    setuserData({ ...userData, username: event.target.value });
    setshowError(false);

    if (event.target.value.length >= 3) setisUsernameCorrect(true);
    else setisUsernameCorrect(false);
  };

  const passwordChange = (event) => {
    setshowError(false);
    setuserData({ ...userData, password: event.target.value });

    if (event.target.value.length >= 8) setisPasswordCorrect(true);
    else setisPasswordCorrect(false);
  };

  const signIn = async () => {
    const data = await api.signin(userData);

    if (data.status === "Error") {
      setshowError(true);
      setdisplayMessage(data.message);
      setuserData(blankUser);
      setisPasswordCorrect(false);
      setisUsernameCorrect(false);
    } else if (data.status === "OK") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("authUser", data.username);
      navigate(`/user/${data.username}`);
    }
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
          onClick={signIn}
        >
          Log In
        </button>

        {showError && <div className="mt-8 text-red-500">{displayMessage}</div>}
      </div>

      <div className="p-4 bg-white text-center mt-4 border-2 border-gray-200">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
