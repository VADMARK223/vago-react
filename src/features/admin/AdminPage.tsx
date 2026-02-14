import { Tabs, type TabsProps } from 'antd';
import { UsersTab } from './users/UsersTab';
import { MessagesTab } from '@/features/admin/messages/MessagesTab.tsx';

type TabsKey = 'users' | 'messages';

const defaultTabs: TabsKey = 'messages';

export const AdminPage = () => {
  const handleTabChange = (activeKey: string) => {
    console.log('handleTabChange', activeKey);
  };

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

  return (
    <div className="tabs-page">
      <Tabs defaultActiveKey={defaultTabs} items={items} onChange={handleTabChange} />
    </div>
  );
};
