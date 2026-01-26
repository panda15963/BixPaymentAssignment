import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from 'axios';
declare module 'axios' {
    export interface InternalAxiosRequestConfig {
        _retry?: boolean;
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
    }
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
});
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config._skipAuth) return config;

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        throw error;
    }
);

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
    refreshQueue.forEach((cb) => cb(token));
    refreshQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig;

        if (originalRequest?.url?.includes('/auth/refresh')) {
            throw error;
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest._skipAuthRedirect
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                logout();
                throw error;
            }

            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshQueue.push((newToken: string) => {
                        originalRequest.headers = originalRequest.headers ?? {};
                        originalRequest.headers.Authorization =
                            `Bearer ${newToken}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const res = await axios.post(
                    '/api/auth/refresh',
                    { refreshToken },
                    {
                        _skipAuth: true,
                        _skipAuthRedirect: true,
                    }
                );

                const newAccessToken = res.data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);

                axiosInstance.defaults.headers.common.Authorization =
                    `Bearer ${newAccessToken}`;

                processQueue(newAccessToken);

                originalRequest.headers = originalRequest.headers ?? {};
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                logout();
                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        }

        throw error;
    }
);
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    globalThis.location.href = '/login';
}

export default axiosInstance;