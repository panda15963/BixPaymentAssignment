import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {createPost} from '../api/post'
import {useCategory} from '../hooks/useCategory'

export default function PostCreatePage() {
    const navigate = useNavigate()
    const category = useCategory()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!title || !content) {
            alert('제목과 내용을 입력하세요.')
            return
        }

        setLoading(true)
        try {
            const res = await createPost(
                {title, content, category},
                file ?? undefined
            )

            navigate(`/posts/${res.id}?category=${category}`)
        } catch (e) {
            alert(e instanceof Error ? e.message : '오류 발생')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 space-y-4 max-w-3xl">
            <h1 className="text-xl font-bold">게시글 작성</h1>

            <input
                className="w-full border rounded-md p-2"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="w-full border rounded-md p-2 h-40"
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            {/* 파일 업로드 */}
            <div className="space-y-2 rounded-md border bg-gray-50 p-4">
                <label className="block text-sm font-semibold text-gray-700">
                    이미지 첨부
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                    }
                    className="block w-full text-sm
                   file:mr-4 file:rounded-md
                   file:border-0
                   file:bg-indigo-600
                   file:px-4 file:py-2
                   file:text-sm file:font-semibold
                   file:text-white
                   hover:file:bg-indigo-500
                   cursor-pointer"
                />

                {file ? (
                    <div
                        className="flex items-center gap-2 rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-700">
                        <span>
                            선택된 파일
                            <span className="ml-1 font-bold">{file.name}</span>
                        </span>
                    </div>
                ) : (
                    <div className="rounded-md border border-dashed bg-gray-50 px-3 py-2 text-xs text-gray-500">
                        이미지 파일을 선택하지 않아도 게시글 작성이 가능합니다.
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                    등록
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="rounded-md border px-4 py-2"
                >
                    취소
                </button>
            </div>
        </div>
    )
}