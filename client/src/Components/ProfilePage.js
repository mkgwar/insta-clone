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

  const uploadPic = async (event) => {
    const formdata = new FormData();
    formdata.append("profilepic", event.target.files[0]);
    const data = await api.uploadPic(username, formdata);
    setdisplayData({ ...displayData, profilePic: data.profilePic });
  };

  const getUserData = async () => {
    const token = localStorage.getItem("token") || null;
    const data = await api.getProfileData(username, token);

    if (data.status === "Error") {
      setshowError(true);
      setdisplayMessage(data.message);
    } else setshowError(false);

    if (data.status === "OK") {
      setdisplayData({
        username: data._doc.username,
        isEditable: data.isEditable,
        desc: data._doc.desc,
        profilePic: data._doc.profilePic,
      });
    }
  };

  return (
    <div>
      <div className="w-full bg-white">
        <div className="w-full mx-auto p-4 px-8 bg-white max-w-6xl">
          <h1 className="font-bold text-3xl">Insta Clone</h1>
        </div>
      </div>

      {showError ? (
        <div className="w-full h-32 flex justify-center items-center">
          {displayMessage}
        </div>
      ) : (
        <div className="w-full mx-auto py-4 px-8 max-w-6xl flex items-center gap-16">
          <div className="w-1/2 flex justify-end">
            <div className="bg-gray-200 h-40 w-40 rounded-full relative">
              {displayData.profilePic != "" && (
                <img
                  src={displayData.profilePic}
                  alt=""
                  className="absolute h-full w-full object-cover rounded-full"
                />
              )}
              {displayData.isEditable && (
                <div className="h-full w-full bg-black opacity-0 rounded-full z-10 absolute text-white font-bold hover:bg-opacity-25 hover:opacity-100">
                  <label
                    htmlFor="profilepic"
                    className="w-full h-full flex justify-center items-center cursor-pointer"
                  >
                    Upload pic
                  </label>
                  <input
                    type="file"
                    id="profilepic"
                    name="profilepic"
                    className="hidden"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={uploadPic}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              <h1 className="text-4xl">{displayData.username}</h1>
              {displayData.isEditable && (
                <button className="px-6 py-1 bg-white border-2 border-gray-200 rounded-lg">
                  Edit
                </button>
              )}
            </div>
            <div className="w-full mt-8">{displayData.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
