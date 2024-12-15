import axios from "axios";
import axiosInstance from "@/hooks/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axiosInstance.defaults.withCredentials = true;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      errors: {},
      loading: false,
      status: null,
      sessionVerified: false,

      csrf: () => axiosInstance.get(`${backendUrl}/sanctum/csrf-cookie`),

      getUser: async () => {
        try {
          const { data } = await axiosInstance.get(`${backendUrl}/api/user`);
          set({ user: data, sessionVerified: true });
          return data;
        } catch (e) {
          console.warn("Error ", e);
          set({ sessionVerified: false });
        }
      },

      login: async ({ email, password }, onSuccess) => {
        set({ errors: {}, loading: true });
        await get().csrf();
        const body = { email, password };
        try {
          const response = await axiosInstance.post(
            `${backendUrl}/api/v1/auth/login`,
            JSON.stringify(body)
          );
          const { data } = await axiosInstance.get(`${backendUrl}/api/user`);
          console.log("Response:", response.data);
          set({ user: response.data.data.user, sessionVerified: true });
          await get().getUser();
          return { user: response.data.data.user };
        } catch (e) {
          if (e.response && e.response.data) {
            set({ errors: e.response.data, loading: false });
          } else {
            console.warn(e);
            set({ loading: false });
          }
          return null;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post(`${backendUrl}/api/v1/auth/logout`);
          set({ user: null, sessionVerified: false });
        } catch (e) {
          console.warn("Error during logout: ", e);
        }
      },

      sendResetRequest: async (email) => {
        try {
          const response = await axios.post("/forgot-password", { email });
          return response.data;
        } catch (error) {
          throw error.response
            ? error.response.data
            : new Error("An error occurred");
        }
      },

      register: async (
        {
          name,
          surname,
          email,
          password,
          password_confirmation,
          terms,
          privacy,
        },
        onSuccess
      ) => {
        set({ errors: {}, loading: true });
        try {
          await get().csrf();
          await axiosInstance.post(`${backendUrl}/api/v1/auth/register`, {
            name,
            surname,
            email,
            password,
            password_confirmation,
            terms,
            privacy,
            username: email.split("@")[0], // Generating username from email temporarily
          });

          const userData = await get().getUser();
          set({ user: userData, sessionVerified: true });
          if (onSuccess) onSuccess(userData);
          return { user: userData };
        } catch (e) {
          if (e.response && e.response.data) {
            set({ errors: e.response.data, loading: false });
          } else {
            console.warn(e);
            set({ loading: false });
          }
          return null;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
      partialize: (state) => ({}),
    }
  )
);

export default useUserStore;
