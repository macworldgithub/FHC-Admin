import { CaretDownOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  message,
  Modal,
  Space,
  Switch,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useState, useEffect } from "react";
import { RcFile } from "antd/lib/upload";
import { deletePhoto, handleUpload } from "../../firebase/methods";
import ICategories from "../../models/Categories";
import TextArea from "antd/es/input/TextArea";

interface Props {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  actionFunction: (category: ICategories) => void;
  editCategory?: ICategories | null;
}

export const InsertCategoryModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  actionFunction,
  editCategory,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedType, setSelectedType] = useState<string>(editCategory?.typeId === 1 ? "Surgical" : editCategory?.typeId === 2 ? "Dental" : "Type");
  const [description, setDescription] = useState("");
  const [showOnNav, setShowOnNav] = useState(false);
  const [catName, setCatName] = useState("");

  useEffect(() => {
    if (editCategory) {
      setCatName(editCategory.name);
      setDescription(editCategory.description);
      setShowOnNav(editCategory.showOnNav);
      setSelectedType("Type"); // Adjust this if you have different types
      if (editCategory.image) {
        setFileList([
          {
            name: editCategory.name,
            uid: editCategory._id ? editCategory._id : "abc-def-ghi",
            status: "done",
            url: editCategory.image,
          },
        ]);
      }
    } else {
      resetForm();
    }
  }, [editCategory]);

  const resetForm = () => {
    setCatName("");
    setDescription("");
    setShowOnNav(false);
    setSelectedType("Type");
    setFileList([]);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    return true;
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <p onClick={() => setSelectedType("Type")}>Type</p>,
    },
    {
      key: 2,
      label: <p onClick={() => setSelectedType("Surgical")}>Surgical</p>,
    },
    {
      key: 3,
      label: <p onClick={() => setSelectedType("Dental")}>Dental</p>,
    },
  ];

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload,
    fileList: fileList,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const fl = file as RcFile;
        const downloadURL = await handleUpload(fl);

        console.log("customeRequest ran", file);
        const fileUploaded: UploadFile = {
          name: fl.name,
          uid: fl.uid,
          status: "done",
          url: downloadURL,
        };
        setFileList([fileUploaded]);
        if (onSuccess) onSuccess({ url: downloadURL });
      } catch (error: any) {
        if (onError) onError(error);
      }
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("uploading", info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    async onRemove(file) {
      console.log("file removed", file);

      const response = await deletePhoto(file.url ? file.url : "");
      console.log("response file remove", response);
      if (response) {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
      }
    },
  };

  const submitValues = () => {
    const payload: ICategories = {
      description,
      image: fileList[0]?.url ? fileList[0].url : "",
      name: catName,
      showOnNav,
      typeId: 1,
      _id: editCategory?._id || undefined,
    };

    actionFunction(payload);
  };

  return (
    <Modal
      title="Insert new category"
      centered
      open={openModal}
      onOk={() => submitValues()}
      onCancel={() => setOpenModal(false)}
    >
      <div>
        <p>Category Name:</p>
        <Input
          placeholder="Insert name"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p>Category Description:</p>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Insert Description"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>

      <div className="mt-4">
        <p>Show on navigation:</p>
        <Switch checked={showOnNav} onChange={(value) => setShowOnNav(value)} />
      </div>

      <div className="mt-4">
        <p>Instrument Type:</p>
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["1"],
          }}
          className="w-1/3"
        >
          <Typography.Link>
            <Space className="flex flex-row justify-between border px-3 py-1 text-black font-normal rounded-md shadow-md">
              {selectedType}
              <CaretDownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>

      <div className="mt-4">
        <p>Category Image:</p>
        <Upload className="w-1/3" {...props}>
          <Button className="w-full" icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>
      </div>
    </Modal>
  );
};
