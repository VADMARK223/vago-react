import type {Chapter} from './book.ts';
import {Link} from 'react-router-dom';
import {ROUTE} from '../../constants/routes.ts';
import {chapters} from './chapters.tsx';

export function BookTocPage() {
    return (
        <>
            {chapters.map((chapter: Chapter) => (
                <div key={chapter.id}>
                    <Link to={`${ROUTE.BOOK}/${chapter.id}`}>{chapter.title}</Link>
                </div>
            ))}
        </>
    )
}
