import axiosInstance from "@/hooks/axios";

export const getProducts = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/v1/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu');
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axiosInstance.post('/api/v1/products', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(error.response?.data?.message || 'Ürün oluşturulurken bir hata oluştu');
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/api/v1/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.response?.status === 404) {
      throw new Error('Ürün bulunamadı');
    }
    throw new Error(error.response?.data?.message || 'Ürün güncellenirken bir hata oluştu');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.response?.status === 404) {
      throw new Error('Ürün bulunamadı');
    }
    throw new Error(error.response?.data?.message || 'Ürün silinirken bir hata oluştu');
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.response?.status === 404) {
      throw new Error('Ürün bulunamadı');
    }
    throw new Error(error.response?.data?.message || 'Ürün bilgileri yüklenirken bir hata oluştu');
  }
};
