import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/Home/logo.svg";
import { HomeFilled, InboxOutlined, TableOutlined } from "@ant-design/icons";
import sidecurve from "../../assets/images/common/sidecurve.svg";
import logout from "../../assets/images/common/logout.svg";
import { useState } from "react";

export const SideNav = () => {
  const {pathname} = useLocation();
  const sideMarkCss = "absolute h-full";
  const sideMartHideCss = "hidden h-full";
  const [selectedNav, setSelectedNav] = useState(pathname);

  return (
    <div className="w-full relative flex flex-col items-center h-screen py-10">
      <div>
        <img src={logo} alt="not found" />
      </div>
      <div className="flex flex-col w-full py-10 text-[#A8A8A8]">
        <Link
          to={"/"}
          className="h-14 relative"
          onClick={() => setSelectedNav("/")}
        >
          <img
            src={sidecurve}
            className={
              selectedNav === "/" ? sideMarkCss : sideMartHideCss
            }
            alt="not found"
          />
          <div className="flex justify-center h-full">
            <li className={`text-center h-full flex items-center w-2/5 md:w-2/3 lg:w-4/5 xl:w-4/6 ${selectedNav === "/" ? "text-[#068FFF]" : ""}`}>
              <HomeFilled className="text-base lg:text-2xl mx-2" />
              <p className="font-semibold text-sm lg:text-lg px-1 hidden md:block">Dashboard</p>
            </li>
          </div>
        </Link>
        <Link
          to={"/categories"}
          className="h-14 relative"
          onClick={() => setSelectedNav("/categories")}
        >
          <img
            src={sidecurve}
            className={
              selectedNav === "/categories" ? sideMarkCss : sideMartHideCss
            }
            alt="not found"
          />
          <div className="flex justify-center h-full">
            <li className={`text-center flex items-center w-2/5 md:w-2/3 lg:w-4/5 xl:w-4/6 ${selectedNav === "/categories" ? "text-[#068FFF]" : ""}`}>
              <TableOutlined className="text-base lg:text-2xl mx-2" />
              <p className="font-semibold text-sm lg:text-lg px-1 hidden md:block">Category</p>
            </li>
          </div>
        </Link>
        <Link
          to={"/subcategories"}
          className="h-14 relative"
          onClick={() => setSelectedNav("/subcategories")}
        >
          <img
            src={sidecurve}
            className={
              selectedNav === "/subcategories" ? sideMarkCss : sideMartHideCss
            }
            alt="not found"
          />
          <div className="flex justify-center h-full">
            <li className={`text-center h-full flex items-center w-2/5 md:w-2/3 lg:w-4/5 xl:w-4/6 ${selectedNav === "/subcategories" ? "text-[#068FFF]" : ""}`}>
              <TableOutlined className="text-base lg:text-2xl mx-2" />
              <p className="font-semibold text-sm lg:text-lg hidden xl:block px-1">Sub Category</p>
              <p className="font-semibold text-sm lg:text-lg hidden md:block xl:hidden px-1">
                S.Category
              </p>
            </li>
          </div>
        </Link>
        <Link
          to={"/products"}
          className="h-14 relative"
          onClick={() => setSelectedNav("/products")}
        >
          <img
            src={sidecurve}
            className={
              selectedNav === "/products" ? sideMarkCss : sideMartHideCss
            }
            alt="not found"
          />
          <div className="flex justify-center h-full">
            <li className={`text-center py-4 flex items-center w-2/5 md:w-2/3 lg:w-4/5 xl:w-4/6 ${selectedNav === "/products" ? "text-[#068FFF]" : ""}`}>
              <InboxOutlined className="text-base lg:text-2xl mx-2" />
              <p className="font-semibold text-sm lg:text-lg px-1 hidden md:block">Products</p>
            </li>
          </div>
        </Link>
      </div>
      <div className="fixed bottom-0">
        <div className="flex flex-col justify-center items-center pb-10">
          <img src={logout} alt="not found" className="w-1/2" />
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
};
