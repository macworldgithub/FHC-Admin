import { CaretDownOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  MenuProps,
  message,
  Modal,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useState, useEffect } from "react";
import { RcFile } from "antd/lib/upload";
import { deletePhoto, handleUpload } from "../../firebase/methods";
import { ISubCategories } from "../../models/SubCategories";
import ICategories from "../../models/Categories";

interface Props {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  actionFunction: (payload: ISubCategories) => void;
  categories: ICategories[];
  editSubCategory?: ISubCategories;
}

type MenuItemType = {
  key: string;
  label: React.ReactNode;
};

export const InsertSubCategoryModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  actionFunction,
  categories,
  editSubCategory,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Select Category");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("");
  const [subCatName, setSubCatName] = useState<string>("");

  useEffect(() => {
    if (editSubCategory) {
      setSubCatName(editSubCategory.name);
      setSelectedCategoryKey(editSubCategory.catId);
      const category = categories.find(
        (cat) => cat._id === editSubCategory.catId
      );
      setSelectedCategory(category ? category.name : "Select Category");
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: editSubCategory.image,
        },
      ]);
    } else {
      resetForm();
    }
  }, [editSubCategory, categories]);

  const resetForm = () => {
    setSubCatName("");
    setSelectedCategory("Select Category");
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
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  const menuItems: MenuItemType[] = categories.map((cat) => ({
    key: cat._id ? cat._id : "",
    label: cat.name,
  }));

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);

    if (selectedItem) {
      setSelectedCategory(selectedItem.label as string);
      setSelectedCategoryKey(selectedItem.key as string);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload,
    fileList: fileList,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const fl = file as RcFile;
        const downloadURL = await handleUpload(fl);

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
      const response = await deletePhoto(file.url ? file.url : "");
      if (response) {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
      }
    },
  };

  const submitValues = () => {
    const payload: ISubCategories = {
      catId: selectedCategoryKey,
      image: fileList[0]?.url ? fileList[0].url : "",
      name: subCatName,
    };

    actionFunction(payload);
    setOpenModal(false);
    resetForm();
    console.log(payload);
  };

  return (
    <Modal
      title={editSubCategory ? "Edit subcategory" : "Insert new subcategory"}
      centered
      open={openModal}
      onOk={submitValues}
      onCancel={() => {
        setOpenModal(false);
        resetForm();
      }}
    >
      <div>
        <p>Subcategory Name:</p>
        <Input
          placeholder="Insert name"
          value={subCatName}
          onChange={(e) => setSubCatName(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p>Select Category:</p>
        <Dropdown
          overlay={<Menu items={menuItems} onClick={handleMenuClick} />}
          className="w-1/3"
        >
          <Typography.Link>
            <Space className="flex flex-row justify-between border px-3 py-1 text-black font-normal rounded-md shadow-md">
              {selectedCategory}
              <CaretDownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>

      <div className="mt-4">
        <p>Subcategory Image:</p>
        <Upload className="w-1/3" {...uploadProps}>
          <Button className="w-full" icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>
      </div>
    </Modal>
  );
};
