import type {Chapter} from './book.ts'
import {Link} from 'react-router-dom'
import {ROUTE} from '../../constants/routes.ts'
import {chapters} from './chapters.tsx'

export function BookTocPage() {

    const reactChapters = chapters.filter(value => value.type === 'react')
    const tsChapters = chapters.filter(value => value.type === 'ts')

    return (
        <>
            <h1>Оглавление</h1>
            <h2>React</h2>
            {reactChapters.map((chapter: Chapter) => (
                <div key={chapter.id}>
                    <Link to={`${ROUTE.BOOK}/${chapter.id}`}>{chapter.title}</Link>
                </div>
            ))}
            <hr/>
            <h2>TypeScript</h2>
            {tsChapters.map((chapter: Chapter) => (
                <div key={chapter.id}>
                    <Link to={`${ROUTE.BOOK}/${chapter.id}`}>{chapter.title}</Link>
                </div>
            ))}
        </>
    )
}
