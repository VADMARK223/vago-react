import type { User } from '@/features/auth/auth.ts';
import { Space } from 'antd';
import { SignOutButton } from '@/features/auth/user-info/avatar/SignOutButton.tsx';

type Props = {
  me: User;
};

export const AvatarPopoverContent = ({ me }: Props) => {
  return (
    <Space orientation="vertical">
      <div>
        <b>{me.username}</b>
      </div>
      <SignOutButton isCompact={false} />
    </Space>
  );
};
