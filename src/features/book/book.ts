import type {JSX} from 'react';

export type Chapter = {
    id: number;
    title: string;
    render: () => JSX.Element;
}

