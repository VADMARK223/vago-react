import style from './ScrollableContainer.module.css';
import { type RefObject, useEffect, useState } from 'react';
import { VagoButton } from '@/shared/ui/VagoButton';
import { ChevronUp } from 'lucide-react';

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
};

export function ScrollToTopButton({ containerRef }: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      setVisible(container.scrollTop > 30);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  const scrollToTop = () => {
    containerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <VagoButton
      shape="circle"
      icon={ChevronUp}
      onClick={scrollToTop}
      className={style.toTopButton}
      style={{
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
