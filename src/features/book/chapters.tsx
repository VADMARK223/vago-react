import type { Chapter } from './book';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Hooks',
    type: 'react',
    load: () => import('./chapters/react/hooks/HooksChapter'),
  },
  {
    id: 2,
    title: 'Utility Types',
    type: 'ts',
    load: () => import('./chapters/ts/UtilityTypesChapter'),
  },
  {
    id: 3,
    title: 'Интерфейсы и типы',
    type: 'ts',
    load: () => import('./chapters/ts/InterfacesAndTypes'),
  },
  {
    id: 4,
    title: 'Keys',
    type: 'react',
    load: () => import('./chapters/react/KeysChapter'),
  },
  {
    id: 5,
    title: 'Const object as enum pattern',
    type: 'ts',
    load: () => import('./chapters/ts/ConstObjectAsEnumPattern'),
  },
  {
    id: 6,
    title: 'Правила использования хуков',
    type: 'react',
    load: () => import('./chapters/react/HooksRulesChapter'),
  },
  {
    id: 7,
    title: 'Event loop',
    type: 'js',
    load: () => import('./chapters/js/EventLoopChapter'),
  },
  {
    id: 8,
    title: 'Expression reduce',
    type: 'js',
    load: () => import('./chapters/js/ReduceChapter'),
  },
  {
    id: 9,
    title: 'Expression flatMap',
    type: 'js',
    load: () => import('./chapters/js/FlatMapChapter'),
  },
  {
    id: 10,
    title: 'Специальные типы',
    type: 'ts',
    load: () => import('./chapters/ts/SpecialTypesChapter'),
  },
  {
    id: 11,
    title: 'React Developer Tools',
    type: 'react',
    load: () => import('./chapters/react/ReactDevToolsChapter'),
  },
];
