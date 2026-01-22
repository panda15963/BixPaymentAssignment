import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Main from "./components/Main.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route index element={<Main/>}/>
                </Route>
            </Routes>
            <Analytics />
        </BrowserRouter>
    </StrictMode>,
)