import { GuestColor, type HexColor, type User } from '../auth.ts';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { UserPopoverContent } from '@/features/auth/user-menu/UserPopoverContent.tsx';

interface Props {
  me: User | undefined;
  isMeLoading: boolean;
  isCompact?: boolean;
}

export function UserMenu({ me, isMeLoading, isCompact }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const avatarLetter = me?.username?.trim().charAt(0).toUpperCase() || 'Г';
  const avatarBg: HexColor = (me?.color ?? GuestColor) as HexColor;

  return (
    <Space>
      <Popover
        content={
          <UserPopoverContent
            me={me}
            isCompact={!!isCompact}
            isMeLoading={isMeLoading}
            onRequestClose={() => setIsPopoverOpen(false)}
          />
        }
        trigger="click"
        placement="bottomRight"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <Tooltip
          title="Открыть меню навигации пользователя"
          open={isPopoverOpen ? false : undefined}
        >
          <Avatar
            style={{
              background: avatarBg,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {avatarLetter}
          </Avatar>
        </Tooltip>
      </Popover>
    </Space>
  );
}
