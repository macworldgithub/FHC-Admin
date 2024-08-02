import { TotalCards } from "../components/Home/TotalCards";
import { ChartComp } from "../components/Home/ChartComp";

export const Home = () => {
  return (
    <div className="w-full flex">
      <div className="w-4/5">
        <TotalCards />
        <div className="w-full">
          <div className="w-[98%] mt-5 rounded-xl">
            <ChartComp />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="fixed h-screen border-l top-0" />
      </div>
      <div className="hidden md:flex flex-col items-center w-1/5 pt-5">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-400">
          <img src={""} alt="not_found" />
        </div>
        <p className="text-[#068FFF]">Muhammad Bilal</p>
        <p className="text-[#ADADAD]">Admin</p>
      </div>
    </div>
  );
};
