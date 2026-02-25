import { VagoButton } from '@/shared/ui/VagoButton';
import { CirclePauseIcon, CirclePlay } from 'lucide-react';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  disabled: boolean;
}

export const PlayPauseButton = ({ isPlaying, onPlay, onPause, disabled }: PlayPauseButtonProps) => {
  const icon = isPlaying ? CirclePauseIcon : CirclePlay;
  const iconColor = isPlaying ? '#1890ff' : '#52c41a';
  const onClick = isPlaying ? onPause : onPlay;
  return <VagoButton icon={icon} iconColor={iconColor} onClick={onClick} disabled={disabled} />;
};
