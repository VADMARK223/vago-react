import type { ComponentType } from 'react';

export type ChapterType = 'react' | 'ts' | 'js';

export type Chapter = {
  id: number;
  title: string;
  type: ChapterType;
  load: () => Promise<{ default: ComponentType<unknown> }>;
};
