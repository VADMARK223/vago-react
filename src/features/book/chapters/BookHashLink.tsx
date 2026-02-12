import { HashLink } from 'react-router-hash-link';
import * as React from 'react';

interface Props {
  id: string;
  children: React.ReactNode;
}

export const BookHashLink = ({ id, children }: Props) => {
  return (
    <HashLink smooth to={`#${id}`}>
      {children}
    </HashLink>
  );
};
