import type {ComponentType} from 'react'

type ChapterType = 'react' | 'ts'

export type Chapter = {
    id: number;
    title: string;
    type: ChapterType
    load: () => Promise<{ default: ComponentType<unknown> }>
}

