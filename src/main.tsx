import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import './index.css'
import RootLayout from './layouts/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import PostLayout from './layouts/PostLayout'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<RootLayout />}>
                {/* 메인 */}
                <Route index element={<LoginPage />} />

                {/* 인증 */}
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>

                {/* 게시판 */}
                <Route path="posts" element={<PostLayout />}>
                    {/* /posts */}
                    <Route index element={<PostListPage />} />

                    {/* /posts/new */}
                    <Route path="new" element={<PostCreatePage />} />

                    {/* /posts/:id/edit ✅ 반드시 :id 보다 위 */}
                    <Route path=":id/edit" element={<PostEditPage />} />

                    {/* /posts/:id */}
                    <Route path=":id" element={<PostDetailPage />} />
                </Route>

                {/* 그 외 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>

        <Analytics />
    </BrowserRouter>
)