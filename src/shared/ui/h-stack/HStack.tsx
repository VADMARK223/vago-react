import styles from './HStack.module.css';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  stretch?: boolean;
};

export const HStack = ({ children, stretch = false }: Props) => {
  return (
    <div
      className={styles.hStack}
      style={{
        alignItems: stretch ? 'stretch' : 'center',
      }}
    >
      {children}
    </div>
  );
};
