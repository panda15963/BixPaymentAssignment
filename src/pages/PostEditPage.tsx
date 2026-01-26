import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostDetail, updatePost } from '../api/post'
import type { BoardPostDetail } from '../api/post'

export default function PostEditPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('NOTICE')

    const [originImage, setOriginImage] = useState<string | null>(null)
    const [newFile, setNewFile] = useState<File | null>(null)

    useEffect(() => {
        const postId = Number(id)
        if (!postId) {
            setError('잘못된 접근입니다.')
            setLoading(false)
            return
        }

        const fetchPost = async () => {
            try {
                const data: BoardPostDetail = await getPostDetail(postId)

                setTitle(data.title)
                setContent(data.content)
                setCategory(data.boardCategory)
                setOriginImage(data.imageUrl ?? null)
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

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력하세요.')
            return
        }

        try {
            await updatePost(
                Number(id),
                {
                    title,
                    content,
                    category,
                },
                newFile ?? undefined
            )

            navigate(`/posts/${id}`)
        } catch (e) {
            alert(
                e instanceof Error
                    ? e.message
                    : '게시글 수정 중 오류가 발생했습니다.'
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

    return (
        <div className="p-6 max-w-3xl space-y-6">
            <h1 className="text-xl font-bold">게시글 수정</h1>

            {/* 카테고리 */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
            >
                <option value="NOTICE">공지</option>
                <option value="FREE">자유</option>
                <option value="QNA">Q&A</option>
                <option value="ETC">기타</option>
            </select>

            {/* 제목 */}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                className="w-full rounded-md border px-3 py-2 text-sm"
            />

            {/* 내용 */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
                rows={10}
                className="w-full rounded-md border px-3 py-2 text-sm resize-none"
            />

            {/* 기존 이미지 */}
            {originImage && !newFile && (
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">기존 이미지</p>
                    <img
                        src={originImage}
                        alt="기존 이미지"
                        className="max-h-60 rounded-md border object-contain"
                    />
                </div>
            )}

            {/* 새 이미지 업로드 */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setNewFile(e.target.files?.[0] ?? null)
                }
                className="text-sm"
            />

            {/* 버튼 */}
            <div className="flex gap-3 pt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                >
                    취소
                </button>
                <button
                    onClick={handleSubmit}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                >
                    저장
                </button>
            </div>
        </div>
    )
}