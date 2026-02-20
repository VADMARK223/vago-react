import { HashLink } from 'react-router-hash-link';
import type { ReactNode } from 'react';

interface Props {
  id: string;
  children: ReactNode;
}

export const BookHashLink = ({ id, children }: Props) => {
  return (
    <HashLink smooth to={`#${id}`}>
      {children}
    </HashLink>
  );
};
