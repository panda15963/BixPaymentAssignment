import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    author: string;
    createdAt: string;
    views: number;
}

const dummyPosts: Post[] = [
    {
        id: 1,
        title: '첫 번째 게시글입니다',
        author: '관리자',
        createdAt: '2026-01-20',
        views: 123,
    },
    {
        id: 2,
        title: 'React Router Layout 정리',
        author: 'minseok',
        createdAt: '2026-01-21',
        views: 87,
    },
    {
        id: 3,
        title: 'Sidebar 구조 어떻게 잡나요?',
        author: 'user01',
        createdAt: '2026-01-22',
        views: 45,
    },
];

export default function PostListPage() {
    return (
        <div>
            {/* 페이지 제목 */}
            <h2 className="mb-6 text-xl font-bold text-gray-900">
                게시글 목록
            </h2>

            {/* 게시글 테이블 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium">번호</th>
                        <th className="px-4 py-3 text-left font-medium">제목</th>
                        <th className="px-4 py-3 text-left font-medium">작성자</th>
                        <th className="px-4 py-3 text-left font-medium">작성일</th>
                        <th className="px-4 py-3 text-right font-medium">조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dummyPosts.map((post) => (
                        <tr
                            key={post.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">{post.id}</td>
                            <td className="px-4 py-3">
                                <Link
                                    to={`/posts/${post.id}`}
                                    className="font-medium text-indigo-600 hover:underline"
                                >
                                    {post.title}
                                </Link>
                            </td>
                            <td className="px-4 py-3">{post.author}</td>
                            <td className="px-4 py-3">{post.createdAt}</td>
                            <td className="px-4 py-3 text-right">{post.views}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 하단 영역 */}
            <div className="mt-6 flex justify-end">
                <Link
                    to="/posts/create"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                    글쓰기
                </Link>
            </div>
        </div>
    );
}
