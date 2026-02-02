import type {JSX} from 'react'

type ChapterType = 'react' | 'ts'

export type Chapter = {
    id: number;
    title: string;
    type: ChapterType
    render: () => JSX.Element;
}

