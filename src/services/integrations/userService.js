import apiService from "../apiService";
/**
 * Verify user's email address
 * @param {string} id - User ID
 * @param {string} hash - Verification hash
 * @param {string} expires - Expiration timestamp
 * @param {string} signature - Security signature
 * @returns {Promise} Promise object with verification result
 */
export const verifyEmail = async (id, hash, expires, signature) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/auth/email/verify/${id}/${hash}`,
      {
        params: {
          expires,
          signature,
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Email verified successfully",
    };
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error
      const message =
        error.response.data.message || "Email verification failed";
      return {
        success: false,
        message: message,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        success: false,
        message: "No response from server. Please try again.",
      };
    } else {
      // Request setup error
      return {
        success: false,
        message: "Error verifying email. Please try again.",
      };
    }
  }
};

export const updateAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await apiService.post("api/v1/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw new Error("Profil fotoğrafı güncellenirken bir hata oluştu");
  }
};

export const changePassword = async (data) => {
  try {
    // Validate input
    if (!data.current_password || !data.new_password || !data.new_password_confirmation) {
      throw new Error("Tüm alanları doldurunuz");
    }

    const response = await apiService.post("api/v1/settings/change-password", data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw error;
    }
    throw new Error("Şifre değiştirme işlemi başarısız oldu");
  }
};
export const fetchSettings = async () => {
  try {
    const response = await apiService.get("api/v1/settings");
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw error;
    }
    throw new Error("Ayarlar getirilirken bir hata oluştu");
  }
};

export const updateEmailNotifications = async (data) => {
  try {
    const response = await apiService.put("api/v1/settings", data);
    return {
      message: response.data.message,
      data: response.data.data
    };
  } catch (error) {
    if (error.response?.data?.message) {
      throw error;
    }
    throw new Error("E-posta bildirim ayarları güncellenirken bir hata oluştu");
  }
};

export const updateSettings = async (data) => {
  try {
    const response = await apiService.put("api/v1/settings", data);
    return response.data;
  } catch (error) {
    throw new Error("Ayarlar güncellenirken bir hata oluştu");
  }
};
export const updateEmail = async (data) => {
  try {
    if (!data.email) {
      return {
        success: false,
        message: "E-posta adresi gereklidir"
      };
    }

    const response = await apiService.put("api/v1/settings/email", data);
    console.log(response);
    return {
      success: response.success,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "E-posta güncellenirken bir hata oluştu",
      error: error.response?.data || error.message
    };
  }
};
