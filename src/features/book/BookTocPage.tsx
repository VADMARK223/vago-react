import type { Chapter, ChapterType } from './book.ts';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../shared/constants/routes.ts';
import { chapters } from './chapters.tsx';

export default function BookTocPage() {
  const groupedChapters = chapters.reduce<Record<ChapterType, Chapter[]>>(
    (acc, chapter) => {
      acc[chapter.type].push(chapter);
      return acc;
    },
    { react: [], ts: [], js: [] },
  );

  const renderSection = (title: string, items: Chapter[]) => (
    <>
      <h2>{title}</h2>
      {items.map((chapter: Chapter) => (
        <div key={chapter.id}>
          <Link to={`${ROUTE.BOOK}/${chapter.id}`}>{chapter.title}</Link>
        </div>
      ))}
      <hr />
    </>
  );

  return (
    <>
      {renderSection('React', groupedChapters.react)}
      {renderSection('TypeScript', groupedChapters.ts)}
      {renderSection('JavaScript', groupedChapters.js)}
    </>
  );
}
