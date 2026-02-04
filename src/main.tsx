import {createRoot} from 'react-dom/client'
import './styles/index.css'
import {App as AntApp, ConfigProvider, theme} from 'antd'
import {RouterProvider} from 'react-router-dom'
import {router} from './app/router.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {StrictMode} from 'react'

const {darkAlgorithm} = theme
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                algorithm: darkAlgorithm,
                token: {
                    fontSize: 16,
                    colorBgBase: '#282A36',
                    colorTextBase: '#F8F8F2',

                    colorPrimary: '#4e94ce',

                    colorBorder: '#44475A',
                    borderRadius: 4,
                },
                components: {
                    Layout: {
                        headerPadding: '0 0',
                        headerBg: '#2b2d30',
                        bodyBg: '#1e1f22',
                        siderBg: '#21222C',
                    },
                    Menu: {
                        darkItemBg: '#21222C',
                        darkSubMenuItemBg: '#21222C',
                        darkItemSelectedBg: '#44475A',
                        darkItemSelectedColor: '#F8F8F2',
                    },
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <AntApp>
                    <RouterProvider router={router}/>
                </AntApp>
            </QueryClientProvider>
        </ConfigProvider>
    </StrictMode>
)