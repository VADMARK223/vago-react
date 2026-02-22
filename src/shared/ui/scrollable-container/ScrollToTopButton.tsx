import style from './ScrollableContainer.module.css';
import { type RefObject } from 'react';
import { VagoButton } from '@/shared/ui/VagoButton';
import { ChevronUp } from 'lucide-react';
import type { VirtuosoHandle } from 'react-virtuoso';

type Props =
  | { kind: 'container'; containerRef: RefObject<HTMLDivElement | null> }
  | { kind: 'virtuoso'; virtuosoRef: RefObject<VirtuosoHandle | null> };

export function ScrollToTopButton(props: Props) {
  const scrollToTop = () => {
    if (props.kind === 'container') {
      props.containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    props.virtuosoRef.current?.scrollToIndex({ index: 0, behavior: 'smooth' });
  };

  return (
    <VagoButton
      shape="circle"
      icon={ChevronUp}
      onClick={scrollToTop}
      className={style.toTopButton}
    />
  );
}
