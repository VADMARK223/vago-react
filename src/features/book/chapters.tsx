import type {Chapter} from './book.ts'
import {HooksChapter} from './chapters/HooksChapter.tsx'
import {UtilityTypesChapter} from './chapters/UtilityTypesChapter.tsx'

export const chapters: Chapter[] = [{
    id: 1,
    title: 'Hooks',
    render: () => (<HooksChapter/>)
},{
    id: 2,
    title: 'Utility Types',
    render: () => (<UtilityTypesChapter/>)
}]
