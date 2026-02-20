import { type LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

type Props = {
  icon: ComponentType<LucideProps>;
  size?: number;
} & Omit<LucideProps, 'size'>;

export const LucideIcon = ({ icon: Component, size = 16, ...rest }: Props) => {
  return <Component size={size} {...rest} />;
};
