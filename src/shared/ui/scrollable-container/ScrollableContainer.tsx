import style from './ScrollableContainer.module.css';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { ScrollToTopButton } from './ScrollToTopButton';

type Props = {
  children: ReactNode;
};

function ScrollableContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const next = container.scrollTop > 30;
      setVisible((prev) => (prev === next ? prev : next));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={style.scrollableWrapper}>
      <div ref={containerRef} className={style.scrollableContent}>
        {children}
      </div>
      {visible && <ScrollToTopButton kind="container" containerRef={containerRef} />}
    </div>
  );
}

export default ScrollableContainer;
