import { Drawer, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AppHeader } from './AppHeader.tsx';
import { AppMenu } from './AppMenu.tsx';
import { useAppUi } from '../shared/ui/useAppUi.ts';

export function AppLayout() {
  const { isPhone } = useAppUi();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      {!isPhone && (
        <Sider width={230} collapsed={collapsed} trigger={null}>
          <AppMenu />
        </Sider>
      )}

      <Layout>
        <AppHeader
          collapsed={collapsed}
          onToggleCollapse={() => {
            setCollapsed((v) => !v);
          }}
        />
        <Content>
          <div className="content">
            <Outlet />
          </div>
        </Content>
      </Layout>

      {isPhone && (
        <Drawer
          placement="left"
          size={170}
          open={collapsed}
          onClose={() => setCollapsed(false)}
          styles={{
            body: { padding: 0 },
            header: { display: 'none' },
          }}
        >
          <AppMenu
            onItemClick={() => {
              setCollapsed(false);
            }}
          />
        </Drawer>
      )}
    </Layout>
  );
}
