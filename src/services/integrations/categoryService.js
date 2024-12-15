import axiosInstance from "@/hooks/axios";

export const getCategories = async () => {
  const response = await axiosInstance.get("/api/v1/categories");
  return response.data;
};

export const getBrandCategories = async () => {
  const response = await axiosInstance.get("/api/v1/categories/type/brand");
  return response.data;
};
