import styles from './VStack.module.css';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  stretch?: boolean;
};

export const VStack = ({ children, stretch = true }: Props) => {
  return (
    <div className={styles.vStack} style={{ alignItems: stretch ? 'stretch' : 'flex-start' }}>
      {children}
    </div>
  );
};
