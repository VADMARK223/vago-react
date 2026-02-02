import { Navigate, useParams } from 'react-router-dom'
import { chapters } from './chapters'
import { ROUTE } from '../../constants/routes'
import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'

type Loaded = { id: number; Component: ComponentType } | null

export default function BookChapterPage() {
    const { chapterId } = useParams()

    const id = Number(chapterId)
    const chapter = Number.isFinite(id) ? chapters.find(ch => ch.id === id) : null

    const [loaded, setLoaded] = useState<Loaded>(null)

    useEffect(() => {
        let cancelled = false

        if (!chapter) return

        chapter.load().then((mod) => {
            if (cancelled) return
            setLoaded({ id: chapter.id, Component: mod.default })
        })

        return () => {
            cancelled = true
        }
    }, [chapter])

    if (!Number.isFinite(id) || !chapter) {
        return <Navigate to={ROUTE.BOOK} replace />
    }

    const ChapterComponent = loaded?.id === chapter.id ? loaded.Component : null

    return (
        <>
            <h1>{chapter.title}</h1>
            {!ChapterComponent ? <div>Загрузка главы...</div> : <ChapterComponent />}
        </>
    )
}
