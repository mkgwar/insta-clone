import { useState } from "react";

const SignInSignUp = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showError, setshowError] = useState(false);
  const [isUsernameCorrect, setisUsernameCorrect] = useState(false);
  const [isPasswordCorrect, setisPasswordCorrect] = useState(false);

  const usernameChange = (event) => {
    setusername(event.target.value);

    if (event.target.value.length >= 3) setisUsernameCorrect(true);
    else setisUsernameCorrect(false);
  };

  const passwordChange = (event) => {
    setpassword(event.target.value);

    if (event.target.value.length >= 8) setisPasswordCorrect(true);
    else setisPasswordCorrect(false);
  };

  return (
    <div>
      <div className="p-8 bg-white flex flex-col items-center border-2 border-gray-200">
        <h1 className="text-3xl font-bold mb-8">Insta Clone</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={usernameChange}
          className="px-4 py-2 bg-gray-50 border-2 border-gray-200 w-72 text-sm focus:outline-none rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
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
        >
          Log In
        </button>

        {showError && (
          <div className="mt-8 text-red-500">
            Username or password is incorrect.
          </div>
        )}
      </div>

      <div className="p-4 bg-white text-center mt-4 border-2 border-gray-200">
        Don't have an account? Sign up
      </div>
    </div>
  );
};

export default SignInSignUp;
