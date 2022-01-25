const WhitePhone = () => {
  return (
    <div className="bg-white h-[60vh] w-72 items-center flex flex-col border-4 border-gray-100 p-2 rounded-3xl shadow-xl">
      <div className="bg-black h-2 w-2 rounded-full" />
      <div className="bg-black h-2 w-16 rounded-full relative mt-3">
        <div className="bg-black h-3 w-3 rounded-full absolute -left-6 top-1/2 -translate-y-1/2" />
      </div>
      <div className="screen h-full w-full border-4 border-black mt-8"></div>
      <div className="h-12 w-12 rounded-full bg-white border-2 border-black mt-3" />
    </div>
  );
};

export default WhitePhone;
