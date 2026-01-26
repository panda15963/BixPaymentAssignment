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

    useEffect(() => {
        setPage(0)
    }, [category])

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

    const categoryPosts = useMemo(() => {
        return allPosts
            .filter((post) => post.category === category)
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
    }, [allPosts, category])

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
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {category} 게시판
                </h2>

                <Link
                    to={`/posts/new?category=${category}`}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    글쓰기
                </Link>
            </div>

            {categoryPosts.length === 0 ? (
                <p className="text-gray-400">게시글이 없습니다.</p>
            ) : (
                <>
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