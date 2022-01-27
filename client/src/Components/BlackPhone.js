const BlackPhone = () => {
  return (
    <div className="bg-gray-900 h-[60vh] w-72 items-center flex flex-col border-4 border-black p-2 rounded-3xl shadow-xl">
      <div className="bg-gray-700 h-2 w-2 rounded-full" />
      <div className="bg-gray-700 h-2 w-16 rounded-full relative mt-3">
        <div className="bg-gray-700 h-3 w-3 rounded-full absolute -left-6 top-1/2 -translate-y-1/2" />
      </div>
      <div className="black-screen h-full w-full border-4 border-black mt-8"></div>
      <div className="h-12 w-12 rounded-full bg-gray-700 border-2 border-black mt-3" />
    </div>
  );
};

export default BlackPhone;
