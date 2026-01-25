import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/post'
import type { BoardPost } from '../api/post'
import Pagination from '../components/common/Pagination'
import { useCategory } from '../hooks/useCategory'

const PAGE_SIZE = 5
const FETCH_SIZE = 1000

export default function PostListPage() {
    const category = useCategory()

    const [allPosts, setAllPosts] = useState<BoardPost[]>([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)

    // 카테고리 변경 시 페이지 초기화
    useEffect(() => {
        setPage(0)
    }, [category])

    // 게시글 전체 로딩
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const data = await getPosts({
                    page: 0,
                    size: FETCH_SIZE,
                })
                setAllPosts(data.content)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    // ✅ 카테고리 필터링 + 최신순 정렬
    const categoryPosts = useMemo(() => {
        return allPosts
            .filter((post) => post.category === category)
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
    }, [allPosts, category])

    // 프론트 pagination
    const totalPages = Math.ceil(categoryPosts.length / PAGE_SIZE)
    const pagedPosts = categoryPosts.slice(
        page * PAGE_SIZE,
        (page + 1) * PAGE_SIZE
    )

    if (loading) {
        return <p className="p-4 text-gray-400">게시글 불러오는 중…</p>
    }

    return (
        <div className="p-4 space-y-4">
            {/* 상단 영역 */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {category} 게시판
                </h2>

                {/* 글쓰기 버튼 */}
                <Link
                    to={`/posts/new?category=${category}`}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    글쓰기
                </Link>
            </div>

            {/* 게시글 없음 */}
            {categoryPosts.length === 0 ? (
                <p className="text-gray-400">게시글이 없습니다.</p>
            ) : (
                <>
                    {/* 게시글 리스트 */}
                    <div className="space-y-3">
                        {pagedPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/posts/${post.id}?category=${category}`}
                                className="block rounded-md border p-4 hover:bg-gray-50"
                            >
                                <h3 className="font-semibold">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {post.category} ·{' '}
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={setPage}
                        groupSize={5}
                    />
                </>
            )}
        </div>
    )
}