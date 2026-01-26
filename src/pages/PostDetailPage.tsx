import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostDetail, deletePost } from '../api/post'
import type { BoardPostDetail } from '../api/post'

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [post, setPost] = useState<BoardPostDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const postId = Number(id)
        if (!postId) {
            setError('잘못된 접근입니다.')
            setLoading(false)
            return
        }

        const fetchPost = async () => {
            setLoading(true)
            try {
                const data = await getPostDetail(postId)
                setPost(data)
            } catch (e) {
                setError(
                    e instanceof Error
                        ? e.message
                        : '게시글을 불러오지 못했습니다.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    /* =======================
     * Delete handler
     * ======================= */
    const handleDelete = async () => {
        if (!post) return

        const ok = globalThis.confirm('정말 이 게시글을 삭제하시겠습니까?')
        if (!ok) return

        try {
            await deletePost(post.id)
            alert('게시글이 삭제되었습니다.')
            navigate('/posts')
        } catch (e) {
            alert(
                e instanceof Error
                    ? e.message
                    : '게시글 삭제 중 오류가 발생했습니다.'
            )
        }
    }

    /* =======================
     * Render
     * ======================= */

    if (loading) {
        return <p className="p-6 text-gray-400">게시글 불러오는 중…</p>
    }

    if (error) {
        return (
            <div className="p-6 space-y-3">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-indigo-600 hover:underline"
                >
                    ← 뒤로가기
                </button>
            </div>
        )
    }

    if (!post) {
        return <p className="p-6 text-gray-400">게시글이 없습니다.</p>
    }

    return (
        <div className="p-6 space-y-6 mx-auto">
            {/* 제목 */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {post.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    {post.boardCategory} ·{' '}
                    {new Date(post.createdAt).toLocaleString()}
                </p>
            </div>

            {/* 이미지 */}
            {post.imageUrl && (
                <div className="overflow-hidden rounded-md border">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full max-h-125 object-contain bg-gray-50"
                        loading="lazy"
                    />
                </div>
            )}

            {/* 본문 */}
            <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {post.content}
            </div>

            {/* 하단 버튼 */}
            <div className="flex gap-3 pt-6 border-t">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                >
                    목록으로
                </button>

                <button
                    onClick={() => navigate(`/posts/${post.id}/edit`)}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                >
                    수정
                </button>

                <button
                    onClick={handleDelete}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                >
                    삭제
                </button>
            </div>
        </div>
    )
}
