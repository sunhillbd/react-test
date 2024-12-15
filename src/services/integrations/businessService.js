import axiosInstance from "@/hooks/axios";

export const registerBusiness = async (data) => {
  const response = await axiosInstance.post("/api/v1/brands", data);
  return response.data;
};

export const getBrandInfo = async (brandId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/brands/${brandId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand info:', error);
    throw error;
  }
};

export const updateBrandInfo = async (brandId, data) => {
  try {
    const response = await axiosInstance.put(`/api/v1/brands/${brandId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating brand info:', {
      brandId,
      error: error.message,
      stack: error.stack
    });
    
    if (error.response?.status === 422) {
      throw new Error('Marka güncellenirken bir hata oluştu');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Marka bulunamadı');
    }
    
    throw new Error('Marka güncellenirken bir hata oluştu');
  }
};

export const uploadBrandLogo = async (brandId, file) => {
  try {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await axiosInstance.post(`/api/v1/brands/${brandId}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logo yüklenirken bir hata oluştu');
  }
};

export const getBrands = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/v1/brands', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error(error.response?.data?.message || 'Markalar yüklenirken bir hata oluştu');
  }
};

export const getCategories = async () => {
  const response = await axiosInstance.get('/api/v1/categories');
  return response.data;
};

export const getBrandsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/brands/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands by category:', error);
    throw new Error(error.response?.data?.message || 'Markalar yüklenirken bir hata oluştu');
  }
};

export const getBrand = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    if (error.response?.status === 404) {
      throw new Error('Marka bulunamadı');
    }
    throw new Error('Marka bilgileri yüklenirken bir hata oluştu');
  }
};
