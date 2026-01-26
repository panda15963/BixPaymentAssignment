import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
                <Route index element={<LoginPage />} />

                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>

                <Route path="posts" element={<PostLayout />}>
                    <Route index element={<PostListPage />} />
                    <Route path="new" element={<PostCreatePage />} />
                    <Route path=":id/edit" element={<PostEditPage />} />
                    <Route path=":id" element={<PostDetailPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
)