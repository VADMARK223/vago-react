import styles from '@/features/chat/ui/middle/ChatMiddle.module.css';

interface DateItemProps {
  label: string;
}

export const DateItem = ({ label }: DateItemProps) => {
  return (
    <div className={styles.dateDivider}>
      <span className={styles.dateBubble}>{label}</span>
    </div>
  );
};
