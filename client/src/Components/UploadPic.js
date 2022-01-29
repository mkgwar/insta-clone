import { useState, useRef } from "react";
import * as api from "../API/index";

const UploadPic = ({ setopenPicMenu, username, uploadList, setuploadList }) => {
  const desc = useRef("");
  const [showPic, setshowPic] = useState(false);
  const [picPath, setpicPath] = useState("");
  const [canUpload, setcanUpload] = useState(false);
  const [imageData, setimageData] = useState();

  const selectPic = (event) => {
    if (event.target.files.length > 0) {
      setpicPath(URL.createObjectURL(event.target.files[0]));
      setimageData(event.target.files[0]);
      setshowPic(true);
      setcanUpload(true);
    }
  };

  const uploadPicandDesc = async () => {
    if (picPath !== "") {
      const uploadData = new FormData();
      uploadData.append("picupload", imageData);
      uploadData.append("desc", desc.current.value);
      const data = await api.upload(username, uploadData);
      setuploadList([...uploadList, { ...data._doc }]);
      setopenPicMenu(false);
    }
  };

  return (
    <div className="left-0 top-0 bottom-0 right-0 bg-black bg-opacity-50 absolute flex justify-center items-center z-10">
      <div className="bg-white p-8 shadow-md">
        <h1 className="text-2xl mb-8">Upload</h1>
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-8 relative">
            <div className="h-80 w-80 bg-gray-200 relative">
              {showPic && (
                <img
                  src={picPath}
                  alt=""
                  className="absolute h-full w-full object-cover"
                />
              )}
            </div>
            <label
              htmlFor="picupload"
              className="cursor-pointer py-2 px-4 border-gray-200 border-2"
            >
              Select a photo
            </label>
            <input
              type="file"
              name="picupload"
              id="picupload"
              className="hidden"
              onChange={selectPic}
            />
          </div>
          <div className="flex flex-col items-center justify-between relative">
            <textarea
              placeholder="Add a description (optional)"
              ref={desc}
              className="h-40 w-80 p-4 resize-none border-2 border-gray-200 focus:outline-none"
            />
            <div className="space-x-4 absolute right-0 bottom-0">
              <button
                className="cursor-pointer py-2 px-4 border-gray-200 border-2"
                onClick={() => setopenPicMenu(false)}
              >
                Cancel
              </button>

              <button
                className={
                  "cursor-pointer py-2 px-4 text-white " +
                  (canUpload
                    ? "bg-blue-600 pointer-events-auto"
                    : "bg-blue-300 pointer-events-none")
                }
                onClick={uploadPicandDesc}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPic;
