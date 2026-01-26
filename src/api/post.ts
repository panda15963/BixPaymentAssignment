import axiosInstance from './AxiosConfig'
import { AxiosError } from 'axios'
export type BoardCategoryResponse = Record<string, string>

export const getBoardCategories = async (): Promise<BoardCategoryResponse> => {
    try {
        const res = await axiosInstance.get('/boards/categories', {
            _skipAuth: true,
            _skipAuthRedirect: true,
        })

        return res.data
    } catch (error) {
        const err = error as AxiosError

        if (err.response?.status === 403) {
            throw new Error('카테고리 접근 권한이 없습니다.')
        }

        throw new Error('카테고리 조회 중 오류가 발생했습니다.')
    }
}
export interface BoardPost {
    id: number
    title: string
    category: string // NOTICE | FREE | QNA | ETC
    createdAt: string
}

export interface PageResponse<T> {
    content: T[]
    totalPages: number
    totalElements: number
    number: number
    size: number
    first: boolean
    last: boolean
    numberOfElements: number
    empty: boolean
}

export interface GetPostsParams {
    page: number
    size: number
    category?: string
}

export const getPosts = async (
    params: GetPostsParams
): Promise<PageResponse<BoardPost>> => {
    try {
        const res = await axiosInstance.get('/boards', {
            params: {
                page: params.page,
                size: params.size,
                ...(params.category && { category: params.category }),
            },
        })

        return res.data
    } catch (error) {
        const err = error as AxiosError

        if (err.response?.status === 401) {
            throw new Error('로그인이 필요합니다.')
        }

        throw new Error('게시글 목록 조회 중 오류가 발생했습니다.')
    }
}

export interface BoardPostDetail {
    id: number
    title: string
    content: string
    boardCategory: string // NOTICE | FREE | QNA | ETC
    imageUrl?: string
    createdAt: string
}

export const getPostDetail = async (
    id: number
): Promise<BoardPostDetail> => {
    try {
        const res = await axiosInstance.get(`/boards/${id}`, {
            _skipAuth: true,
            _skipAuthRedirect: true,
        })

        return res.data
    } catch (error) {
        const err = error as AxiosError

        if (err.response?.status === 404) {
            throw new Error('게시글을 찾을 수 없습니다.')
        }

        throw new Error('게시글 조회 중 오류가 발생했습니다.')
    }
}
export interface CreatePostRequest {
    title: string
    content: string
    category: string // NOTICE | FREE | QNA | ETC
}

export interface CreatePostResponse {
    id: number
}

export const createPost = async (
    request: CreatePostRequest,
    file?: File
): Promise<CreatePostResponse> => {
    const formData = new FormData()

    formData.append(
        'request',
        new Blob([JSON.stringify(request)], {
            type: 'application/json',
        })
    )

    if (file) {
        formData.append('file', file)
    }

    try {
        const res = await axiosInstance.post('/boards', formData)
        return res.data
    } catch (error) {
        const err = error as AxiosError
        throw new Error(
            err.response?.status === 401
                ? '로그인이 필요합니다.'
                : '게시글 작성 중 오류가 발생했습니다.'
        )
    }
}
export interface UpdatePostRequest {
    title: string
    content: string
    category: string // NOTICE | FREE | QNA | ETC
}

export const updatePost = async (
    id: number,
    request: UpdatePostRequest,
    file?: File
): Promise<void> => {
    const formData = new FormData()

    formData.append(
        'request',
        new Blob([JSON.stringify(request)], {
            type: 'application/json',
        })
    )

    if (file) {
        formData.append('file', file)
    }

    try {
        await axiosInstance.patch(`/boards/${id}`, formData)
    } catch (error) {
        const err = error as AxiosError

        if (err.response?.status === 401) {
            throw new Error('로그인이 필요합니다.')
        }

        if (err.response?.status === 403) {
            throw new Error('게시글 수정 권한이 없습니다.')
        }

        if (err.response?.status === 404) {
            throw new Error('게시글을 찾을 수 없습니다.')
        }

        throw new Error('게시글 수정 중 오류가 발생했습니다.')
    }
}
export const deletePost = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/boards/${id}`)
    } catch (error) {
        const err = error as AxiosError

        if (err.response?.status === 401) {
            throw new Error('로그인이 필요합니다.')
        }

        if (err.response?.status === 403) {
            throw new Error('게시글 삭제 권한이 없습니다.')
        }

        if (err.response?.status === 404) {
            throw new Error('게시글을 찾을 수 없습니다.')
        }

        throw new Error('게시글 삭제 중 오류가 발생했습니다.')
    }
}