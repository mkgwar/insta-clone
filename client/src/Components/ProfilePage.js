import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../API/index";
import ImagePage from "./ImagePage";
import ProfileUploads from "./ProfileUploads";
import UploadPic from "./UploadPic";

const blankUser = { username: "", isEditable: false, desc: "", profilePic: "" };

const ProfilePage = () => {
  const { username } = useParams();
  const authUser = localStorage.getItem("authUser") || "NO_USER_FOUND";
  const navigate = useNavigate();
  const [showError, setshowError] = useState(true);
  const [displayMessage, setdisplayMessage] = useState("");
  const [openMenu, setopenMenu] = useState(false);
  const [displayData, setdisplayData] = useState(blankUser);
  const [openEdit, setopenEdit] = useState(false);
  const [updatedDesc, setupdatedDesc] = useState(displayData.desc);
  const [openPicMenu, setopenPicMenu] = useState(false);
  const [uploadList, setuploadList] = useState([]);
  const [openImageViewer, setopenImageViewer] = useState(false);
  const [imageData, setimageData] = useState({});
  const [userList, setuserList] = useState([]);

  useEffect(() => {
    getUserData();
  }, [username]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    navigate("/");
  };

  const arrangeImageData = (upload) => {
    setopenImageViewer(true);
    setimageData({ ...upload, profilePic: displayData.profilePic });
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
      event.preventDefault();
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
    }

    if (data.status === "OK") {
      setdisplayData({
        username: data._doc.username,
        desc: data._doc.desc,
        profilePic: data._doc.profilePic,
        isEditable: data.isEditable,
      });

      setupdatedDesc(data._doc.desc);
      setshowError(false);

      const uploads = await api.getupload(username);
      setuploadList(uploads);

      const users = await api.getusers();
      const updatedUsers = users.filter((user) => user.username !== username);
      setuserList(updatedUsers);
    }
  };

  return (
    <div
      className={
        openPicMenu || openImageViewer ? "fixed h-screen w-screen" : ""
      }
    >
      <div className="w-full bg-white border-b-2 border-gray-200">
        <div className="w-full mx-auto p-4 h-20 bg-white max-w-6xl flex items-center justify-between">
          <h1 className="font-bold text-3xl w-full">Insta Clone</h1>

          {authUser === username && authUser !== "NO_USER_FOUND" && (
            <div className="relative h-full flex items-center gap-8">
              <div
                className="text-blue-600 text-center cursor-pointer"
                onClick={() => setopenPicMenu(true)}
              >
                Upload
              </div>
              <div
                className="h-12 w-12 rounded-full bg-gray-200 cursor-pointer relative"
                onClick={() => setopenMenu(!openMenu)}
              >
                {displayData.profilePic !== "" && (
                  <img
                    src={displayData.profilePic}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                )}

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
            </div>
          )}
          {authUser !== username && authUser !== "NO_USER_FOUND" && (
            <div className="w-fit whitespace-nowrap text-blue-600">
              <Link to={"/user/" + authUser}>Go to your profile</Link>
            </div>
          )}

          {authUser === "NO_USER_FOUND" && authUser !== username && (
            <div className="w-fit whitespace-nowrap space-x-4 text-blue-600">
              <Link to="/signin">Sign in</Link>
              <button
                className="px-2 py-1 bg-blue-600 text-white"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {showError ? (
        <div className="w-full h-32 flex justify-center items-center">
          {displayMessage}
        </div>
      ) : (
        <div className="mx-auto max-w-6xl w-full flex items-start">
          <div className="w-full">
            <div className="w-full py-4 px-8 flex items-start gap-16">
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
                    <div className="h-full w-full bg-black opacity-0 rounded-full z-2 absolute text-white font-bold hover:bg-opacity-25 hover:opacity-100">
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
            <ProfileUploads
              uploadList={uploadList}
              setuploadList={setuploadList}
              arrangeImageData={arrangeImageData}
            />
            {openPicMenu && (
              <UploadPic
                setopenPicMenu={setopenPicMenu}
                username={username}
                uploadList={uploadList}
                setuploadList={setuploadList}
              />
            )}
            {openImageViewer && (
              <ImagePage
                setopenImageViewer={setopenImageViewer}
                imageData={imageData}
              />
            )}
          </div>
          <div className="w-80 p-4 px-8 mt-4 bg-white shadow-sm border-2 border-gray-200">
            <h1 className="text-xl font-bold">Other Users</h1>
            <div className="mt-4 ">
              {userList.length ? (
                <div>
                  {userList.map((user) => {
                    return (
                      <h2 key={user._id}>
                        <Link
                          to={"/user/" + user.username}
                          className="text-blue-600"
                        >
                          {user.username}
                        </Link>
                      </h2>
                    );
                  })}
                </div>
              ) : (
                <div>No users</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
