import type {Chapter} from './book.ts'

export const chapters: Chapter[] = [{
    id: 1,
    title: 'Hooks',
    type: 'react',
    load: () => import('./chapters/react/hooks/HooksChapter.tsx')
}, {
    id: 2,
    title: 'Utility Types',
    type: 'ts',
    load: () => import('./chapters/ts/UtilityTypesChapter.tsx')
}, {
    id: 3,
    title: 'Interfaces and Types',
    type: 'ts',
    load: () => import('./chapters/ts/InterfacesAndTypes.tsx')
}, {
    id: 4,
    title: 'Keys',
    type: 'react',
    load: () => import('./chapters/react/KeysChapter.tsx')
}, {
    id: 5,
    title: 'Const object as enum pattern',
    type: 'ts',
    load: () => import('./chapters/ts/ConstObjectAsEnumPattern.tsx')
}]
