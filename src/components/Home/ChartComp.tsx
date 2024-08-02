import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export const ChartComp = () => {
  const series = [
    {
      name: "Sales",
      data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
    },
  ];
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/11/2000",
        "2/11/2000",
        "3/11/2000",
        "4/11/2000",
        "5/11/2000",
        "6/11/2000",
        "7/11/2000",
        "8/11/2000",
        "9/11/2000",
        "10/11/2000",
        "11/11/2000",
        "12/11/2000",
        "1/11/2001",
        "2/11/2001",
        "3/11/2001",
        "4/11/2001",
        "5/11/2001",
        "6/11/2001",
      ],
      tickAmount: 10,
      labels: {
        formatter: function (value: string, timestamp?: number, opts?: any) {
          return opts.dateFormatter(
            new Date(timestamp ? timestamp : 0),
            "dd MMM"
          );
        },
      },
    },
    title: {
      text: "Current Month Booking",
      align: "left",
      style: {
        fontSize: "18px",
        color: "#000",
        fontWeight: 600,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    // grid: {
    //   padding: {
    //     bottom: 30,
    //     left: 20,
    //     right: 20,
    //     top: 20,
    //   },
    // },
  };
  return <div className="p-5 shadow-lg rounded-2xl">
  <ReactApexChart
    options={options}
    series={series}
    type="line"
    height={350}
  />
</div>;
};
