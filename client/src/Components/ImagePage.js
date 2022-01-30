const ImagePage = ({ setopenImageViewer, imageData }) => {
  return (
    <div className="bg-black bg-opacity-50 left-0 top-0 bottom-0 right-0 absolute flex justify-center items-center z-10">
      <div className="w-3/5 h-full flex justify-center items-center relative">
        <div className="h-4/5 w-1/2 bg-gray-200 flex items-center">
          <img src={imageData.image} alt="" className="w-full object-fit" />
        </div>
        <div className="w-1/2 h-4/5 bg-white p-8 relative">
          <div
            className="absolute -top-2 -right-2 bg-gray-200 h-8 w-8 rounded-full cursor-pointer"
            onClick={() => setopenImageViewer(false)}
          >
            <div className="bg-black h-4 w-1 rounded-full rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="bg-black h-4 w-1 rounded-full -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="bg-gray-200 h-8 w-8 rounded-full relative">
              <img
                src={imageData.profilePic}
                alt=""
                className="absolute h-full w-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-2xl">{imageData.username}</h1>
          </div>

          <div className="mt-8 w-full">{imageData.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
