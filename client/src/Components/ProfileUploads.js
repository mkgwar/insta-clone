const ProfileUploads = ({
  uploadList,
  setuploadList,
  setopenImageViewer,
  arrangeImageData,
}) => {
  return (
    <div className="w-full mt-16">
      <h1 className="text-3xl">Posts</h1>
      {!uploadList.length && (
        <div className="w-full h-20 flex justify-center items-center text-xl">
          No Posts
        </div>
      )}

      {uploadList.length > 0 && (
        <div className="w-full grid grid-cols-3 grid-rows-1 gap-4 py-8">
          {uploadList.map((upload) => {
            return (
              <div
                key={upload._id}
                className="relative cursor-pointer"
                onClick={() => arrangeImageData(upload)}
              >
                <img
                  src={upload.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileUploads;
