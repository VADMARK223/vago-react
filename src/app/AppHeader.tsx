import { Button, Space, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useMatches } from 'react-router-dom';
import { useMemo } from 'react';
import type { RouteHandle } from './route.ts';
import { UserInfo } from '../features/auth/UserInfo.tsx';
import { GoButton } from './GoButton.tsx';
import { useAppUi } from '../shared/ui/useAppUi.ts';

type AppHeaderProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function AppHeader({ collapsed, onToggleCollapse }: AppHeaderProps) {
  const { isPhone } = useAppUi();
  const matches = useMatches();

  const headerTitle = useMemo(() => {
    for (let i = matches.length - 1; i >= 0; i--) {
      const handle = matches[i].handle as RouteHandle | undefined;
      if (handle?.title) {
        return handle.title;
      }
    }

    return 'Vago';
  }, [matches]);

  return (
    <Header className="header">
      <Space>
        <Button
          type="text"
          onClick={() => onToggleCollapse()}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <Typography.Text strong>{headerTitle}</Typography.Text>
      </Space>

      <Space>
        <UserInfo isPhone={isPhone} />
        <GoButton isPhone={isPhone} />
      </Space>
    </Header>
  );
}
