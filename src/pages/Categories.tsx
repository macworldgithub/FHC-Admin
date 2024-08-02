import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableProps,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { InsertCategoryModal } from "../components/Categories/InsertCategoryModal";
import {
  createCategories,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../api/categories";
import ICategories from "../models/Categories";

export const Categories = () => {
  const [selectedType, setSelectedType] = useState<string>("Type");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<ICategories | null>(null);
  const [data, setData] = useState<ICategories[]>([]);
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
  const columns: TableProps<ICategories>["columns"] = [
    {
      title: "S. No",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, i) => <a>{record.name ? i + 1 : ""}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value: string, record) =>
        record.name ? <img width={60} src={value} alt="not found" /> : <></>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record?.name ? (
          <Space size="middle">
            <a className="text-green-600" onClick={() => handleEdit(record)}>
              Edit
            </a>
            <a
              className="text-red-600"
              onClick={() => handleDelete(record._id ? record._id : "")}
            >
              Delete
            </a>
          </Space>
        ) : (
          <div className="h-5"></div>
        ),
    },
  ];

  const loadingFunction = async (): Promise<void> => {
    setLoading(true);
    const categories: ICategories[] = await getCategories();
    console.log("Categories fetched", categories);

    const numberOfBlankObjectsToAdd = 9 - categories.length;

    if (numberOfBlankObjectsToAdd > 0) {
      for (let i = 0; i < numberOfBlankObjectsToAdd; i++) {
        categories.push({
          description: "",
          image: "",
          name: "",
          showOnNav: false,
          typeId: 0,
          _id: "",
        });
      }
    }

    setData(categories);
    setLoading(false);
  };

  const actionFunction = async (payload: ICategories): Promise<void> => {
    if (edit) {
      await updateCategory(payload);
      message.success("Category updated successfully");
    } else {
      await createCategories(payload);
      message.success("Category created successfully");
    }
    setOpenModal(false);
    setEdit(null);
    await loadingFunction();
  };

  const handleEdit = (category: ICategories) => {
    setEdit(category);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    message.success("Category deleted successfully");
    await loadingFunction();
  };

  useEffect(() => {
    void loadingFunction();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["1"],
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
          onClick={() => {
            setEdit(null);
            setOpenModal(true);
          }}
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
      <InsertCategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        actionFunction={actionFunction}
        editCategory={edit}
      />
    </div>
  );
};
