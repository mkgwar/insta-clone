import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../API/index";

const ProfilePage = () => {
  const { username } = useParams();
  const [showError, setshowError] = useState(false);
  const [displayMessage, setdisplayMessage] = useState("");
  const [displayData, setdisplayData] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = localStorage.getItem("token") || "";
    const data = await api.getProfileData(username, token);

    if (data.status == "Error") {
      setshowError(true);
      setdisplayMessage(data.message);
    } else setshowError(false);

    if (data.status === "OK") {
      setdisplayData({
        username: data._doc.username,
        isEditable: data.isEditable,
        desc: data._doc.desc,
        profilePicture: data._doc.profilePicture,
      });
    }
  };

  return (
    <div>
      <div className="w-full p-4 bg-white">Insta Clone</div>
      {showError ? (
        <div className="w-full h-32 flex justify-center items-center">
          {displayMessage}
        </div>
      ) : (
        <div className="bg-white w-full">
          <div>
            <h1>{displayData.username}</h1>
            {displayData.isEditable && <button>Edit</button>}
          </div>
          <div>{displayData.desc}</div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
