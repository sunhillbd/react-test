import useUserStore from "@/stores/userStore";

// Hook for React components
export const useUser = () => {
  const { user, getUser } = useUserStore();
  return { user, getUser };
};

// Direct access functions for non-React contexts
export const getUser = () => {
  return useUserStore.getState().user;
};

export const getUserAsync = async () => {
  return useUserStore.getState().getUser();
};
