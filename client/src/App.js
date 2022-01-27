import "./App.css";
import Homepage from "./Components/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./Components/SigninPage";
import SignupPage from "./Components/SignupPage";
import ProfilePage from "./Components/ProfilePage";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user/:username" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
