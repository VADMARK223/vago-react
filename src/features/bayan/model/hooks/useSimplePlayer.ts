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
  replay: VoidFn;
  seek: SeekFn;
  toggle: VoidFn;
};

export const useSimplePlayer = (params: Params): SimplePlayer => {
  const durationSec = params.durationSec;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const currentTimeRef = useRef(0);

  const setTime = useCallback((sec: number) => {
    currentTimeRef.current = sec;
    setCurrentTimeSec(sec);
  }, []);

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

      // setCurrentTimeSec(next);
      setTime(next);

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
    startOffsetSecRef.current = currentTimeRef.current; // ✅ ref, не state

    rafIdRef.current = requestAnimationFrame(() => tickRef.current?.());
  }, [isPlaying, stopRaf]);

  const pause = useCallback(() => {
    if (!isPlaying) {
      return;
    }

    setIsPlaying(false);
    stopRaf();

    startOffsetSecRef.current = currentTimeRef.current;
  }, [isPlaying, stopRaf]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    stopRaf();

    // setCurrentTimeSec(0);
    setTime(0);
    startOffsetSecRef.current = 0;
    startPerfMsRef.current = 0;
  }, [stopRaf, setTime]);

  const replay = useCallback(() => {
    const d = durationRef.current;
    if (d <= 0) {
      return;
    }

    stopRaf();

    // мгновенно сбрасываем всё в 0 и стартуем
    setTime(0);
    startOffsetSecRef.current = 0;
    startPerfMsRef.current = performance.now();

    setIsPlaying(true);
    rafIdRef.current = requestAnimationFrame(() => tickRef.current?.());
  }, [stopRaf, setTime]);

  const seek = useCallback<SeekFn>(
    (sec) => {
      const next = clampTime(sec);
      // setCurrentTimeSec(next);
      setTime(next);

      startOffsetSecRef.current = next;
      startPerfMsRef.current = performance.now();
    },
    [clampTime, setTime],
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
    replay,
    seek,
    toggle,
  };
};
