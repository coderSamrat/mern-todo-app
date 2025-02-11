import axios from 'axios';


const VITE_BASE_URL = "https://mern-todo-app-h25k.onrender.com";

const axiosInstance = axios.create({
      baseURL: VITE_BASE_URL,
      timeout: 200000,
      headers: {
            'Content-Type': 'application/json',
      },
});

const handleUnauthorized = (navigate) => {
      localStorage.removeItem("token");
      navigate('/login');
};

axiosInstance.interceptors.request.use(
      (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                  config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response && error.response.status === 401) {
                  const navigate = error.config?.navigate;
                  if (navigate) {
                        handleUnauthorized(navigate); 
                  }
            }
            return Promise.reject(error);
      }
);

export default axiosInstance;
