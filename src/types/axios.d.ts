import "axios";

declare module "axios" {
    export interface AxiosRequestConfig<D = any> {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
        _retry?: boolean;
    }

    export interface InternalAxiosRequestConfig<D = any> {
        _skipAuth?: boolean;
        _skipAuthRedirect?: boolean;
        _retry?: boolean;
    }
}