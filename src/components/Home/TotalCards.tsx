import React from "react";

export const TotalCards: React.FC = () => {
  return (
    <div className="w-[98%] flex justify-start lg:justify-around flex-wrap gap-1">
      <div className="shadow-md p-5 min-w-52 w-[31%] rounded-2xl">
        <p className="text-lg text-[#CCCCCC]">Total Email</p>
        <p className="text-3xl font-bold mt-5">24.590</p>
        <p className="text-sm text-[#00ADEE] bg-[#DAE9FD] w-fit rounded-sm pl-1 mt-5">
          +12.08%
        </p>
      </div>
      <div className="shadow-md p-5 min-w-52 w-[31%] rounded-2xl">
        <p className="text-lg text-[#CCCCCC]">Total Month Email</p>
        <p className="text-3xl font-bold mt-5">102</p>
        <p className="text-sm text-[#00ADEE] bg-[#DAE9FD] w-fit rounded-sm pl-1 mt-5">
          +12.08%
        </p>
      </div>
      <div className="shadow-md p-5 min-w-52 w-[31%] rounded-2xl">
        <p className="text-lg text-[#CCCCCC]">Total Products</p>
        <p className="text-3xl font-bold mt-5">3160</p>
        <p className="text-sm text-[#00ADEE] bg-[#DAE9FD] w-fit rounded-sm pl-1 mt-5">
          +12.08%
        </p>
      </div>
    </div>
  );
};
