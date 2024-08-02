import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { createNewSubCategory, deleteSubCategory, getSubCategories } from "../api/subcategories";
import { getCategories } from "../api/categories";
import { ISubCategories } from "../models/SubCategories";
import ICategories from "../models/Categories";
import { InsertSubCategoryModal } from "../components/SubCategories/InsertSubCategoryModal";

export const SubCategories = () => {
  const [selectedType, setSelectedType] = useState("Type");
  const [subCategories, setSubCategories] = useState<ISubCategories[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<ISubCategories | null>(null);

  const columns: TableProps<ISubCategories>["columns"] = [
    {
      title: "S. No",
      dataIndex: "serial",
      render: (_, record, i) => <a>{record.name ? i + 1 : ""}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "catId",
      dataIndex: "catId",
      render: (value : string) => value ? <p>{categories.filter(cat => cat._id === value)[0]?.name}</p> : <></>
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value: string) =>
        value ? <img width={60} src={value} alt="not found" /> : <></>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record?.name ? (
          <Space size="middle">
            <a className="text-green-600" onClick={() => handleEdit(record)}>Edit</a>
            <a className="text-red-600" onClick={() => handleDelete(record._id ? record._id : "")}>Delete</a>
          </Space>
        ) : (
          <div className="h-5"></div>
        ),
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "type",
      label: <p onClick={() => setSelectedType("General")}>Type</p>,
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

  // Fetch categories and ensure the state is updated
  const fetchAndSetCategories = async () => {
    const fetchedCategories = await getCategories();
    return fetchedCategories;
  };

  // Loading function
  const loadingFunction = async (): Promise<void> => {
    setLoading(true);
    
    // Fetch categories and wait until the state is updated
    const fetchedCategories = await fetchAndSetCategories();

    console.log("fetchedCategories", fetchedCategories);
    
    setCategories(fetchedCategories);

    // Fetch subcategories
    const subcats = await getSubCategories();

    console.log("Subcategories fetched", subcats);

    const numberOfBlankObjectsToAdd = 9 - subcats.length;

    if (numberOfBlankObjectsToAdd > 0) {
      for (let i = 0; i < numberOfBlankObjectsToAdd; i++) {
        subcats.push({
          image: "",
          name: "",
          _id: "",
          catId: "",
          serial: 0
        });
      }
    }

    console.log("Converted data", subcats);

    setSubCategories(subcats);
    setLoading(false);
  };

  const actionFunction = async (payload: ISubCategories) => {
    if (edit) {
      // await updateCategory(payload);
      // message.success("Category updated successfully");
    } else {
      await createNewSubCategory(payload);
      message.success("Category created successfully");
    }
    setOpenModal(false);
    setEdit(null);
    await loadingFunction();
  };

  const handleEdit = (subCategory: ISubCategories) => {
    setEdit(subCategory);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    await deleteSubCategory(id);
    message.success("SubCategory deleted successfully");
    await loadingFunction();
  };

  // Fetch data when component mounts
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
          dataSource={subCategories}
          className="border rounded-lg"
          pagination={{ pageSize: 9 }}
          loading={loading}
        />
      </div>
      <InsertSubCategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        actionFunction={actionFunction}
        categories={categories}
        editSubCategory={edit || undefined}
      />
    </div>
  );
};
