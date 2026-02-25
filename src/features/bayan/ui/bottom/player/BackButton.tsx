import { CircleChevronLeft } from 'lucide-react';
import { VagoButton } from '@/shared/ui/VagoButton';

interface StopButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const BackButton = ({ onClick, disabled }: StopButtonProps) => {
  return (
    <VagoButton
      icon={CircleChevronLeft}
      iconColor="#ff4d4f"
      onClick={onClick}
      disabled={disabled}
    />
  );
};
