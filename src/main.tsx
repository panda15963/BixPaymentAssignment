import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import './index.css'
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import PostLayout from "./layouts/PostLayout";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostListPage from "./pages/PostListPage";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>

                    {/* ✅ "/" 처리 */}
                    <Route index element={<Navigate to="/posts" replace />} />

                    {/* 인증 */}
                    <Route element={<AuthLayout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                    </Route>

                    {/* 게시판 */}
                    <Route path="posts" element={<PostLayout />}>
                        <Route index element={<PostListPage />} />
                    </Route>

                </Route>
            </Routes>
            <Analytics />
        </BrowserRouter>
    </StrictMode>
);