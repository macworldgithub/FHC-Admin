import LoginForm from "../components/Login/LoginForm";
import userlogo from "../assets/images/common/userlogo.svg";

export const Login = () => {
  return (
    <div className="bg-custom-image bg-cover w-full h-screen">
      <div className="w-full h-full bg-black bg-opacity-50">
        <div className="w-full lg:px-16 py-8">
          <img src={userlogo} className="w-28 h-18" alt="not found" />
        </div>

        <div className="px-4 md:px-10 lg:px-16 flex justify-between items-center h-3/4">
          <div className="w-1/2 hidden md:block">
            <p className="md:text-4xl lg:text-5xl xl:text-6xl font-sans font-bold text-white">
              {"We Made Your Medical treatment Easy".toUpperCase()}
            </p>

            <p className="md:text-lg lg:text-2xl md:w-11/12 lg:w-4/6 font-sans font-normal text-white mt-5">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
              Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
            </p>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/2 flex h-full items-center justify-center">
            <div className="w-full lg:w-4/5 xl:w-3/5 p-8 rounded-md bg-white flex flex-col items-center">
              <div className="pb-5">
                <p className="text-2xl font-semibold">Login</p>
              </div>
              <div className="w-full">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
