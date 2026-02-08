import styles from './Book.module.css'
import {Button, Select} from 'antd'
import {StepBackwardOutlined} from '@ant-design/icons'

import {Outlet, useMatch, useNavigate, useParams} from 'react-router-dom'
import {ROUTE} from '../../constants/routes.ts'
import {chapters} from './chapters.tsx'
import {ScrollableContainer} from '../../shared/ui/ScrollableContainer.tsx'

export default function BookPage() {
    const navigate = useNavigate()
    const {chapterId} = useParams()
    const isToc = useMatch(ROUTE.BOOK)

    const handleBack = () => {
        if (!isToc) {
            navigate(-1)
        }
    }

    const chapterNumber = Number(chapterId)
    const selectedId = Number.isFinite(chapterNumber) ? chapterNumber : undefined

    const options = chapters.map(ch => ({
        value: ch.id,
        label: ch.title
    }))

    return (
        <>
            <div className={styles.header}>
                <Button type={'primary'}
                        onClick={handleBack}
                        disabled={!!isToc}
                        icon={<StepBackwardOutlined/>}>Назад</Button>
                <Button type={'primary'} onClick={() => {
                    navigate(ROUTE.BOOK, {replace: true})
                }}>Оглавление</Button>
                <Select style={{width: '100%', visibility: isToc ? 'hidden' : 'visible'}}
                        options={options}
                        value={selectedId}
                        onChange={(val) => {
                            navigate(`${ROUTE.BOOK}/${val}`)
                        }}
                />
            </div>
            <ScrollableContainer>
                <Outlet/>
            </ScrollableContainer>
        </>
    )
}