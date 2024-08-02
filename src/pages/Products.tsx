import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

interface DataType {
  id: string;
  subCat?: string[];
  name?: string;
  price?: number;
  code?: string;
  featureList?: string[];
  description?: string;
  quantity?: number;
  image?: string;
}

const data: DataType[] = [
  {
    id: "1",
    subCat: ["1"],
    name: "Forceps Top Cutting 145mm long",
    price: 2000,
    code: "CF-DEN/016",
    featureList: [
      "Made from high-quality stainless steel for durability and precision.",
      "Ergonomically designed handles for a comfortable grip and ease of use.",
      "Suitable for delicate surgical procedures requiring precise cutting and manipulation.",
    ],
    description:
      "Ideal for surgical applications where side cutting is required. Commonly used in dental and medical surgeries. Individually sterilized to prevent contamination.",
    quantity: 4,
    image:
      "https://www.surgicalholdings.co.uk/media/images/products/scale630x420/1447_1.jpg",
  },
  {
    id: "2",
    subCat: ["1"],
    name: "Forceps Top Cutting 145mm long",
    price: 2000,
    code: "CF-DEN/016",
    featureList: [
      "Premium stainless steel construction ensuring longevity.",
      "Top cutting design allows for precise and accurate incisions.",
      "Comfortable handle design to minimize hand fatigue.",
    ],
    description:
      "Suitable for procedures requiring top access cutting, often used in dental surgeries. Sterile packaging to maintain hygiene standards.",
    quantity: 10,
    image:
      "https://www.surgicalholdings.co.uk/media/images/products/scale630x420/1447_1.jpg",
  },
  {
    id: "3",
    subCat: ["1"],
    name: "Forceps Top Cutting 215mm long",
    price: 2000,
    code: "CF-DEN/016",
    featureList: [
      "Constructed from high-grade stainless steel for optimal performance.",
      "Extra length provides extended reach for deep surgical sites.",
      "Smooth, mirror-polished handles for better control and handling.",
    ],
    description:
      "Designed for surgical procedures needing extended reach and precise top cutting. Pre-sterilized to ensure sterility.",
    quantity: 10,
    image:
      "https://www.surgicalholdings.co.uk/media/images/products/scale630x420/1447_1.jpg",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "7",
  },
  {
    id: "8",
  },
  {
    id: "9",
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "S. No",
    dataIndex: "key",
    key: "key",
    render: (_, record, i) => <p>{record.name ? i + 1 : ""}</p>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sub Category",
    key: "subCat",
    dataIndex: "subCat",
    render: (_, { subCat }) => (
      <>
        {subCat?.map((cat) => {
          let color = cat.length > 5 ? "geekblue" : "green";
          if (cat === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={cat}>
              {cat.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (src, record) =>
      record.name ? <img width={60} src={src} alt="not found" /> : <></>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) =>
      record?.name ? (
        <Space size="middle" className="cursor-pointer">
          <p className="text-green-600">Edit</p>
          <p className="text-red-600">Delete</p>
        </Space>
      ) : (
        <div className="h-5"></div>
      ),
  },
];

export const Products = () => {
  const [selectedType, setSelectedType] = useState("Type");
  const items: MenuProps["items"] = [
    {
      key: "type",
      label: <p onClick={() => setSelectedType("Type")}>Type</p>,
    },
    {
      key: "surgical",
      label: <p onClick={() => setSelectedType("Surgical")}>Surgical</p>,
    },
    {
      key: "dental",
      label: <p onClick={() => setSelectedType("Dental")}>Dental</p>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["3"],
          }}
        >
          <Typography.Link>
            <Space className="border px-3 py-1 text-black font-medium rounded-md shadow-md">
              {selectedType}
              <CaretDownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>

        <Button
          icon={<PlusOutlined />}
          iconPosition={"end"}
          className="shadow-md"
        >
          Add
        </Button>
      </div>
      <div className="mt-4 h-full">
        <Table
          columns={columns}
          dataSource={data}
          className="border rounded-lg"
          pagination={{ pageSize: 9 }}
        />
      </div>
    </div>
  );
};
