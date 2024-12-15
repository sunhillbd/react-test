import useUserStore from '@/stores/userStore';

// Simple logout function that can be used anywhere
const logout = async (router = null) => {
  const userStore = useUserStore.getState();
  
  try {
    await userStore.logout();
    localStorage.removeItem('preferences');
    sessionStorage.clear();
    
    // Use router if provided, otherwise fallback to window.location
    
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default logout;
