import { Tabs, type TabsProps } from 'antd';
import { UsersTab } from './users/UsersTab';
import { MessagesTab } from '@/features/admin/messages/MessagesTab.tsx';
import { useUiStore } from '@/shared/state/ui-store.ts';
import type { AdminTabsKey } from '@/shared/types.ts';

const items: TabsProps['items'] = [
  {
    key: 'users',
    label: 'Пользователи',
    children: <UsersTab />,
  },
  {
    key: 'messages',
    label: 'Сообщения',
    children: <MessagesTab />,
  },
  { key: 'comments', label: 'Комментарии', children: 'Комментарии', disabled: true },
];

const isAdminTabsKey = (key: string): key is AdminTabsKey => key === 'users' || key === 'messages';

export const AdminPage = () => {
  const adminKeyTab = useUiStore((s) => s.adminTabKey);
  const setAdminTabKey = useUiStore((s) => s.setAdminTabKey);

  const handleTabChange = (activeKey: string) => {
    if (isAdminTabsKey(activeKey)) {
      setAdminTabKey(activeKey);
    }
  };

  return (
    <div className="tabs-page">
      <Tabs activeKey={adminKeyTab} items={items} onChange={handleTabChange} />
    </div>
  );
};
