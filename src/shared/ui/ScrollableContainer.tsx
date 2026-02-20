import style from './ScrollableContainer.module.css';
import { type ReactNode, useRef } from 'react';
import { ScrollToTopButton } from './ScrollToTopButton';

type Props = {
  children: ReactNode;
};

function ScrollableContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={style.scrollableWrapper}>
      <div ref={containerRef} className={style.scrollableContent}>
        {children}
      </div>
      <ScrollToTopButton containerRef={containerRef} />
    </div>
  );
}

export default ScrollableContainer;
