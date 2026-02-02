import type {Chapter} from './book.ts'
import {HooksChapter} from './chapters/HooksChapter.tsx'
import {UtilityTypesChapter} from './chapters/UtilityTypesChapter.tsx'
import {InterfacesAndTypes} from './chapters/InterfacesAndTypes.tsx'

export const chapters: Chapter[] = [{
    id: 1,
    title: 'Hooks',
    type: 'react',
    render: () => (<HooksChapter/>)
},{
    id: 2,
    title: 'Utility Types',
    type: 'ts',
    render: () => (<UtilityTypesChapter/>)
},{
    id: 3,
    title: 'Interfaces and Types',
    type: 'ts',
    render: () => (<InterfacesAndTypes/>)
}]
