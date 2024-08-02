import axiosInstance from ".";
import { ISubCategories } from "../models/SubCategories";

export const getSubCategories = async (): Promise<ISubCategories[]> => {
  const response = await axiosInstance.get("/subcategories");
  console.log("subcat response", response);

  return response.data;
};

export const createNewSubCategory = async (
  body: ISubCategories
): Promise<ISubCategories> => {
  const response = await axiosInstance.post("/subcategories", body);
  console.log("response", response);
  return response.data;
};

export const updateSubCategory = async (
  _id: string,
  body: ISubCategories
): Promise<ISubCategories> => {
  const response = await axiosInstance.put("/subcategories/" + _id, body);

  return response.data;
};

export const deleteSubCategory = async (_id: string): Promise<void> => {
    console.log("_id", _id);
  const response = await axiosInstance.delete("/subcategories/" + _id);
  console.log("response", response);
};
