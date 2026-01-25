import "axios";

declare module "axios" {
    // axios.get / post / put / delete 등에서 사용하는 config
    export interface AxiosRequestConfig<D = any> {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
        _retry?: boolean;
    }

    // interceptor 내부에서 실제로 전달되는 config
    export interface InternalAxiosRequestConfig<D = any> {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
        _retry?: boolean;
    }
}