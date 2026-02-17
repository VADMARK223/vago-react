import type { ComponentType } from 'react';
import type { Id } from '@/shared/types';

export type ChapterType = 'react' | 'ts' | 'js';

export type Chapter = {
  id: Id;
  ru: string;
  en: string;
  type: ChapterType;
  load: () => Promise<{ default: ComponentType<unknown> }>;
};
