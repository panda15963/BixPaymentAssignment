import axiosInstance from './AxiosConfig';
import { AxiosError } from 'axios';

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

        // 서버에서 내려준 validation 에러가 있는 경우
        if (err.response?.data) {
            throw err.response.data;
        }

        // 그 외 네트워크 / 알 수 없는 에러
        throw new Error('회원가입 중 오류가 발생했습니다.');
    }
};