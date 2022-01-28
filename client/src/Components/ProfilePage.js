import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../API/index";

const blankUser = { username: "", isEditable: false, desc: "", profilePic: "" };

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showError, setshowError] = useState(false);
  const [displayMessage, setdisplayMessage] = useState("");
  const [openMenu, setopenMenu] = useState(false);
  const [displayData, setdisplayData] = useState(blankUser);
  const [openEdit, setopenEdit] = useState(false);
  const [updatedDesc, setupdatedDesc] = useState(displayData.desc);

  useEffect(() => {
    getUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleEdit = (event) => {
    event.preventDefault();
    setopenEdit(!openEdit);
  };

  const descHandler = (event) => {
    setupdatedDesc(event.target.value);
  };

  const updateDesc = async (event) => {
    if (event.key === "Enter") {
      const data = await api.updateDesc(username, { updatedDesc });

      if (data.status === "OK")
        setdisplayData({ ...displayData, desc: updatedDesc });
      setopenEdit(false);
    }
  };

  const uploadPic = async (event) => {
    if (event.target.files.length > 0) {
      const formdata = new FormData();
      formdata.append("profilepic", event.target.files[0]);
      const data = await api.uploadPic(username, formdata);
      setdisplayData({ ...displayData, profilePic: data.profilePic });
    }
  };

  const getUserData = async () => {
    const token = localStorage.getItem("token") || "NO_TOKEN_FOUND";
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

      setupdatedDesc(data._doc.desc);
    }
  };

  return (
    <div>
      <div className="w-full bg-white border-b-2 border-gray-200">
        <div className="w-full mx-auto p-4 px-8 bg-white max-w-6xl flex items-center justify-between">
          <h1 className="font-bold text-3xl w-full">Insta Clone</h1>
          {displayData.isEditable && (
            <div className="relative h-full">
              <div
                className="h-12 w-12 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => setopenMenu(!openMenu)}
              >
                {displayData.profilePic !== "" && (
                  <img
                    src={displayData.profilePic}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                )}
              </div>
              {openMenu && (
                <div className="bg-white border-2 border-gray-200 absolute top-full left-1/2 -translate-x-1/2 z-10 overflow-auto flex flex-col mt-2">
                  <span
                    className="py-4 px-8 hover:bg-gray-200 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showError ? (
        <div className="w-full h-32 flex justify-center items-center">
          {displayMessage}
        </div>
      ) : (
        <div className="w-full mx-auto py-4 px-8 max-w-6xl flex items-start gap-16">
          <div className="w-2/5 flex justify-end">
            <div className="bg-gray-200 h-40 w-40 rounded-full relative">
              {displayData.profilePic !== "" && (
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
                <button
                  className="px-6 py-1 bg-white border-2 border-gray-200 rounded-lg"
                  onClick={toggleEdit}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="w-full mt-8">
              {openEdit ? (
                <div>
                  <textarea
                    value={updatedDesc}
                    onChange={descHandler}
                    className="w-3/5 h-32 p-4 resize-none focus:outline-none border-gray-200 border-2"
                    placeholder="Add a description"
                    onKeyDown={updateDesc}
                  />
                </div>
              ) : (
                <div className="w-3/5">{displayData.desc}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
