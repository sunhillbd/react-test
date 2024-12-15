import axiosInstance from "@/hooks/axios";

// Generic request functions for all HTTP methods
const apiService = {
  get: async (url, params = {}, config = {}) => {
    try {
      const response = await axiosInstance.get(url, { params, ...config });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Handle errors centrally (optional)
const handleError = (error) => {
  console.error("API Error:", error);
  // Customize error handling, like showing notifications
  throw error;
};

export default apiService;
