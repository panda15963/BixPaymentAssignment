import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

// Extend for type safety
declare module 'axios' {
    interface AxiosRequestConfig {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
    }

    interface InternalAxiosRequestConfig {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
    }
}

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config._skipAuth) return config;

        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?._skipAuthRedirect) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;