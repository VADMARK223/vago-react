import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ConfigProvider, theme} from "antd";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// const { defaultAlgorithm } = theme;
const { darkAlgorithm } = theme;
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                algorithm: darkAlgorithm,
                token: {
                    // Dracula base
                    colorBgBase: "#282A36",        // Background :contentReference[oaicite:1]{index=1}
                    colorTextBase: "#F8F8F2",      // Foreground :contentReference[oaicite:2]{index=2}

                    // Brand / accent (обычно берут Purple или Pink)
                    colorPrimary: "#BD93F9",       // Purple :contentReference[oaicite:3]{index=3}

                    // Borders / radius
                    colorBorder: "#44475A",        // Selection :contentReference[oaicite:4]{index=4}
                    borderRadius: 12,
                },
                components: {
                    Layout: {
                        headerBg: "#282A36",
                        bodyBg: "#282A36",
                        siderBg: "#21222C",          // “ansi black” оттенок часто используют как глубже фон :contentReference[oaicite:5]{index=5}
                    },
                    Menu: {
                        darkItemBg: "#21222C",
                        darkSubMenuItemBg: "#21222C",
                        darkItemSelectedBg: "#44475A", // Selection :contentReference[oaicite:6]{index=6}
                        darkItemSelectedColor: "#F8F8F2",
                    },
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </ConfigProvider>
    </StrictMode>,
)