import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// Create Axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add Authorization token if it exists
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Return promise rejection for errors
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Directly return the response data
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle response errors globally
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        console.error('Unauthorized! Redirecting to login...');
        // Clear the token and redirect to the login page
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
