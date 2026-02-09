import type { Chapter } from './book.ts';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Hooks',
    type: 'react',
    load: () => import('./chapters/react/hooks/HooksChapter.tsx'),
  },
  {
    id: 2,
    title: 'Utility Types',
    type: 'ts',
    load: () => import('./chapters/ts/UtilityTypesChapter.tsx'),
  },
  {
    id: 3,
    title: 'Интерфейсы и типы',
    type: 'ts',
    load: () => import('./chapters/ts/InterfacesAndTypes.tsx'),
  },
  {
    id: 4,
    title: 'Keys',
    type: 'react',
    load: () => import('./chapters/react/KeysChapter.tsx'),
  },
  {
    id: 5,
    title: 'Const object as enum pattern',
    type: 'ts',
    load: () => import('./chapters/ts/ConstObjectAsEnumPattern.tsx'),
  },
  {
    id: 6,
    title: 'Правила использования хуков',
    type: 'react',
    load: () => import('./chapters/react/HooksRulesChapter.tsx'),
  },
  {
    id: 7,
    title: 'Event loop',
    type: 'js',
    load: () => import('./chapters/js/EventLoopChapter.tsx'),
  },
  {
    id: 8,
    title: 'Expression reduce',
    type: 'js',
    load: () => import('./chapters/js/ReduceChapter.tsx'),
  },
  {
    id: 9,
    title: 'Expression flatMap',
    type: 'js',
    load: () => import('./chapters/js/FlatMapChapter.tsx'),
  },
];
