import type { ComponentType } from 'react';
import type { Id } from '../../shared/types.ts';

export type ChapterType = 'react' | 'ts' | 'js';

export type Chapter = {
  id: Id;
  title: string;
  type: ChapterType;
  load: () => Promise<{ default: ComponentType<unknown> }>;
};
