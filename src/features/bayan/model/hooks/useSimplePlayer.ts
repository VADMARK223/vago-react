import { useCallback, useEffect, useRef, useState } from 'react';

type Params = {
  durationSec: number; // Длительность трека в секундах
};

type VoidFn = () => void;
type SeekFn = (sec: number) => void;

export type SimplePlayer = {
  isPlaying: boolean;
  currentTimeSec: number;
  durationSec: number;

  play: VoidFn;
  pause: VoidFn;
  stop: VoidFn;
  seek: SeekFn;
  toggle: VoidFn;
};

export const useSimplePlayer = (params: Params): SimplePlayer => {
  const durationSec = params.durationSec;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  const rafIdRef = useRef<number | null>(null);
  const startPerfMsRef = useRef<number>(0); // Время старта (performance.now)
  const startOffsetSecRef = useRef<number>(0); // С какой позиции стартуем/продолжаем

  const tickRef = useRef<(() => void) | null>(null);

  // ✅ ref для duration, чтобы tick не пересоздавался из-за deps
  const durationRef = useRef(0);

  useEffect(() => {
    durationRef.current = params.durationSec;
  }, [params.durationSec]);

  const stopRaf = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const clampTime = useCallback((sec: number) => {
    const d = durationRef.current;

    if (sec < 0) {
      return 0;
    }
    if (sec > d) {
      return d;
    }
    return sec;
  }, []);

  // ✅ tick кладём в ref один раз (зависимости минимальные)
  useEffect(() => {
    tickRef.current = () => {
      const nowPerfMs = performance.now(); // Точные миллисекунды с момента запуска страницы
      const passedSec = (nowPerfMs - startPerfMsRef.current) / 1000; // Время прошедшее со старта трека
      const next = clampTime(startOffsetSecRef.current + passedSec); // Вычисляем новую позицию трека

      setCurrentTimeSec(next); // Обновляем состояние (UI перерисовывается)

      const d = durationRef.current;

      if (d > 0 && next >= d) {
        setIsPlaying(false);
        stopRaf();
        return;
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (tickRef.current) {
          tickRef.current();
        }
      });
    };
  }, [clampTime, stopRaf]);

  const play = useCallback(() => {
    if (isPlaying) {
      return;
    }

    const d = durationRef.current;
    if (d <= 0) {
      return;
    }

    stopRaf();

    setIsPlaying(true);
    startPerfMsRef.current = performance.now();
    startOffsetSecRef.current = currentTimeSec;

    rafIdRef.current = requestAnimationFrame(() => {
      if (tickRef.current) {
        tickRef.current();
      }
    });
  }, [isPlaying, currentTimeSec, stopRaf]);

  const pause = useCallback(() => {
    if (!isPlaying) {
      return;
    }

    setIsPlaying(false);
    stopRaf();
    startOffsetSecRef.current = currentTimeSec;
  }, [isPlaying, currentTimeSec, stopRaf]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    stopRaf();
    setCurrentTimeSec(0);
    startOffsetSecRef.current = 0;
  }, [stopRaf]);

  const seek = useCallback<SeekFn>(
    (sec) => {
      const next = clampTime(sec);
      setCurrentTimeSec(next);

      startOffsetSecRef.current = next;
      startPerfMsRef.current = performance.now();
    },
    [clampTime],
  );

  useEffect(() => stopRaf, [stopRaf]);

  const toggle: VoidFn = isPlaying ? pause : play;

  return {
    isPlaying,
    currentTimeSec,
    durationSec,
    play,
    pause,
    stop,
    seek,
    toggle,
  };
};
