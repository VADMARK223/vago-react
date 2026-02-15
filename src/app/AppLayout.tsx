import { Drawer, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppMenu } from './AppMenu';
import { useAppUi } from '../shared/ui/useAppUi';
import { useUiStore } from '../shared/state/ui-store';

export function AppLayout() {
  const { isPhone } = useAppUi();
  const { sidebarOpen, hideSidebar, toggleSidebar } = useUiStore();

  return (
    <Layout>
      {!isPhone && (
        <Sider width={230} collapsed={!sidebarOpen} trigger={null}>
          <AppMenu />
        </Sider>
      )}

      <Layout>
        <AppHeader collapsed={!sidebarOpen} onToggleCollapse={toggleSidebar} />
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
          open={sidebarOpen}
          onClose={hideSidebar}
          styles={{
            body: { padding: 0 },
            header: { display: 'none' },
          }}
        >
          <AppMenu onItemClick={hideSidebar} />
        </Drawer>
      )}
    </Layout>
  );
}
