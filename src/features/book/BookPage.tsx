import styles from './Book.module.css'
import {Button, Space} from 'antd'

import {Outlet, useMatch, useNavigate} from 'react-router-dom'
import {ROUTE} from '../../constants/routes.ts'

export default function BookPage() {
    const navigate = useNavigate()
    const isToc = useMatch(ROUTE.BOOK)

    const handleBack = () => {
        if (!isToc) {
            navigate(-1)
        }
    }

    return (
        <>
            <div className={styles.header}>
                <Space>
                    <Button type={'primary'} onClick={handleBack} disabled={!!isToc}>Назад</Button>
                    <Button type={'primary'} onClick={() => {
                        navigate(ROUTE.BOOK, {replace: true})
                    }}>Оглавление</Button>
                </Space>
            </div>
            <div className={'scrollable-wrapper'}>
                <div className={'scrollable-content'}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}