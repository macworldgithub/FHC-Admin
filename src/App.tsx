import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "./components/Common/SideNav";
import { TopNav } from "./components/Common/TopNav";
import curveonside from "./assets/images/common/curveonside.svg";

function App() {
  const { pathname } = useLocation();
  

  console.log("location", pathname);
  return (
    <div className="flex border-l-4 border-[#068FFF]">
      {pathname !== "/login" && (
        <div
          id="side-nav"
          className="md:w-1/5 lg:w-1/6 flex flex-col justify-center items-center border-r"
        >
          <SideNav />
        </div>
      )}
      <div id="detail" className={`shadow-inner w-full ${pathname !== "/login" ? "lg:w-5/6" : ""} `}>
        {pathname !== "/login" && (
          <>
            <div className="absolute top-0 right-0 !-z-10 w-1/6">
              <img className="w-full" src={curveonside} alt="not available" />
            </div>
            <div id="top-nav">
              <TopNav />
            </div>
          </>
        )}
        <div className={pathname !== "/login" ? "p-2 xl:pl-20 xl:pr-5 xl:py-10" : ""}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
