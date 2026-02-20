import { Button } from 'antd';
import { type LucideIcon } from 'lucide-react';
import { LucideIcon as LucideIconView } from '@/shared/ui/LucideIcon';
import type { ComponentProps } from 'react';

type VagoButtonProps = {
  icon?: LucideIcon;
  iconColor?: string;
} & Omit<ComponentProps<typeof Button>, 'icon'>;

export const VagoButton = (props: VagoButtonProps) => {
  const { icon, iconColor = 'white', ...rest } = props;
  const finalColor = props.disabled ? '#8c8c8c' : iconColor;

  return (
    <Button
      type="text"
      size="large"
      icon={icon ? <LucideIconView size={30} icon={icon} color={finalColor} /> : undefined}
      {...rest}
    />
  );
};
