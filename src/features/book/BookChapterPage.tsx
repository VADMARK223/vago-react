import {Navigate, useParams} from 'react-router-dom'
import {chapters} from './chapters.tsx'
import {ROUTE} from '../../constants/routes.ts'

export default function BookChapterPage() {
    const {chapterId} = useParams()

    const id = Number(chapterId)
    if (!Number.isFinite(id)) {
        return <Navigate to={ROUTE.BOOK} replace/>
    }

    const chapter = chapters.find(chapter => chapter.id === id)
    if (!chapter) {
        return <Navigate to={ROUTE.BOOK} replace/>
    }

    return (
        <>
            <h1>{chapter.title}</h1>
            <div>{chapter.render()}</div>
        </>
    )
}
