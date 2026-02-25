import { VagoButton } from '@/shared/ui/VagoButton';
import { TimerReset } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const ReplayButton = ({ onClick }: Props) => {
  return <VagoButton icon={TimerReset} iconColor="#1890ff" onClick={onClick} />;
};
