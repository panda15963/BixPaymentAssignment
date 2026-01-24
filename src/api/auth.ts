import axiosInstance from './AxiosConfig';
import { AxiosError } from 'axios';

/* =======================
 * Signup
 * ======================= */

export interface SignupPayload {
    username: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export interface SignupResponse {
    id: number;
    username: string;
    name: string;
}

/** 서버 validation 에러 타입 */
export type SignupErrorResponse = Record<string, string[]>;

export const signup = async (
    payload: SignupPayload
): Promise<SignupResponse> => {
    try {
        const res = await axiosInstance.post<SignupResponse>(
            '/auth/signup',
            payload,
            {
                _skipAuth: true,
                _skipAuthRedirect: true,
            }
        );
        return res.data;
    } catch (error) {
        const err = error as AxiosError<SignupErrorResponse>;

        if (err.response?.data) {
            throw err.response.data;
        }

        throw new Error('회원가입 중 오류가 발생했습니다.');
    }
};

/* =======================
 * Login
 * ======================= */

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export type LoginErrorResponse = {
    message: string;
};

export const login = async (
    payload: LoginPayload
): Promise<LoginResponse> => {
    try {
        const res = await axiosInstance.post<LoginResponse>(
            '/auth/signin',
            payload,
            {
                _skipAuth: true,
                _skipAuthRedirect: true,
            }
        );

        return res.data;
    } catch (error) {
        const err = error as AxiosError<LoginErrorResponse>;

        if (err.response?.data?.message) {
            throw new Error(err.response.data.message);
        }

        throw new Error('로그인 중 오류가 발생했습니다.');
    }
};