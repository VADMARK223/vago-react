import type {Chapter} from './book.ts'

export const chapters: Chapter[] = [{
    id: 1,
    title: 'Hooks',
    type: 'react',
    load: () => import('./chapters/HooksChapter.tsx')
}, {
    id: 2,
    title: 'Utility Types',
    type: 'ts',
    load: () => import('./chapters/UtilityTypesChapter.tsx')
}, {
    id: 3,
    title: 'Interfaces and Types',
    type: 'ts',
    load: () => import('./chapters/InterfacesAndTypes.tsx')
}]
