import 'axios';

declare module 'axios' {
    // axios.post / get 등에서 사용되는 타입
    export interface AxiosRequestConfig<D = any> {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
        _retry?: boolean;
    }

    // interceptor 내부에서 실제로 쓰이는 타입
    export interface InternalAxiosRequestConfig<D = any> {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
        _retry?: boolean;
    }
}