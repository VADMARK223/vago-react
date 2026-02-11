import { Navigate, useParams } from 'react-router-dom';
import { chapters } from './chapters';
import { ROUTE } from '../../shared/constants/routes';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import type { Id } from '../../shared/types.ts';

type Loaded = { id: Id; Component: ComponentType } | null;

export default function BookChapterPage() {
  const { chapterId } = useParams();

  const id = Number(chapterId);
  const chapter = Number.isFinite(id) ? chapters.find((ch) => ch.id === id) : undefined;

  const [loaded, setLoaded] = useState<Loaded>(null);

  useEffect(() => {
    let cancelled = false;

    if (!chapter) {
      return;
    }

    chapter.load().then((mod) => {
      if (cancelled) return;
      setLoaded({ id: chapter.id, Component: mod.default });
    });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  if (!Number.isFinite(id) || !chapter) {
    return <Navigate to={ROUTE.BOOK} replace />;
  }

  const ChapterComponent = loaded?.id === chapter.id ? loaded?.Component : undefined;

  return (
    <>
      <h1>{chapter.title}</h1>
      {ChapterComponent ? <ChapterComponent /> : <div>Загрузка главы...</div>}
    </>
  );
}
