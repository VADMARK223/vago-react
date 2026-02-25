import { StopCircle } from 'lucide-react';
import { VagoButton } from '@/shared/ui/VagoButton';

interface StopButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const StopButton = ({ onClick, disabled }: StopButtonProps) => {
  return <VagoButton icon={StopCircle} iconColor="#ff4d4f" onClick={onClick} disabled={disabled} />;
};
