import ICategories from "../models/Categories";
import axiosInstance from "./index";

export const getCategories = async (): Promise<ICategories[]> => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const createCategories = async (
  item: ICategories
): Promise<ICategories> => {
  const response = await axiosInstance.post("/categories", item);

  return response.data;
};

export const updateCategory = async (
  item: ICategories
): Promise<ICategories> => {
  const response = await axiosInstance.put("/categories/" + item._id, item);

  return response.data;
};

export const deleteCategory = async (_id: string): Promise<void> => {
  const response = await axiosInstance.delete("/categories/" + _id);
  console.log("response", response);
};
