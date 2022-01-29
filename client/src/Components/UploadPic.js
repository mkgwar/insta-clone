import { useState } from "react";

const UploadPic = ({ setopenPicMenu }) => {
  const [showPic, setshowPic] = useState(false);
  const [picPath, setpicPath] = useState("");

  const selectPic = (event) => {
    if (event.target.files.length > 0) {
      setpicPath(URL.createObjectURL(event.target.files[0]));
      setshowPic(true);
    }
  };
  return (
    <div className="h-screen w-screen left-0 top-0 bg-black bg-opacity-50 absolute flex justify-center items-center">
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
              className="h-40 w-80 p-4 resize-none border-2 border-gray-200 focus:outline-none"
            />
            <div className="space-x-4 absolute right-0 bottom-0">
              <button
                className="cursor-pointer py-2 px-4 border-gray-200 border-2"
                onClick={() => setopenPicMenu(false)}
              >
                Cancel
              </button>

              <button className="cursor-pointer py-2 px-4 border-gray-200 border-2">
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
