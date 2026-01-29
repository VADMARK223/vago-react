import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? '/v2/' : '/',
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5555",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ""),
            },
            // если у тебя web-socket чат, можно так:
            // "/ws": { target: "ws://localhost:8080", ws: true },
        },
    },
}))