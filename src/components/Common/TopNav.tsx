import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import notifylogo from "../../assets/images/common/notifylogo.svg";
import userlogo from "../../assets/images/common/userlogo.svg";

const items = [
  {
    key: "1",
    label: "Settings",
  },
  {
    key: "2",
    label: "Logout",
    danger: true,
  },
];

export const TopNav = () => {
  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value: string) => {
  //   console.log("search:", value);
  // };
  return (
    <div className="h-20 flex justify-between px-2 xl:pl-20 xl:pr-0 items-center z-10">
      <div className="h-full flex w-3/5 md:w-2/6 xl:w-1/5 items-end">
        <div>
          <p className="text-xl font-semibold text-[#068FFF]">Analytics</p>
          <p className="text-sm text-gray-400">
            Welcome back, Lets get back to work
          </p>
        </div>
      </div>
      <div className="h-full hidden md:flex md:w-2/6 w-1/5 items-end justify-end">
        <Space className="h-3/5 border w-full md:w-auto px-4 rounded-full">
          <input
            type="text"
            placeholder="Search Dashboard"
            className="border-none focus:outline-none border-transparent focus:ring-0"
          />
          <SearchOutlined className="text-gray-400 mx-2" />
        </Space>
      </div>
      <div className="flex w-1/5 justify-end px-5">
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["3"],
          }}
        >
          <Space>
            <img height={40} width={40} src={notifylogo} alt="not available" />
          </Space>
        </Dropdown>
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["3"],
          }}
        >
          <Space>
            <img height={40} width={40} src={userlogo} alt="not available" />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};
