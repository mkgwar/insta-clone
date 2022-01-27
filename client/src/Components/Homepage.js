import BlackPhone from "./BlackPhone";
import SignIn from "./SignIn";
import WhitePhone from "./WhitePhone";

const Homepage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden gap-8">
      <div className="hidden relative md:flex">
        <div className="relative bottom-4 left-32 -z-10">
          <BlackPhone />
        </div>
        <WhitePhone />
      </div>
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default Homepage;
