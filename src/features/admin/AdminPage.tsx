import {Tabs, type TabsProps} from 'antd';
import {UsersTab} from './UsersTab.tsx';

export function AdminPage() {
    const handleTabChange = (activeKey: string) => {
        console.log('handleTabChange', activeKey);
    }

    const items: TabsProps['items'] = [
        {
            key: 'users',
            label: 'Пользователи',
            children: <UsersTab/>
        },
        {
            key: 'comments',
            label: 'Комментарии',
            children: 'Комментарии',
            disabled: true,
        },
    ];

    return <>
        <Tabs
            defaultActiveKey="users"
            items={items}
            onChange={handleTabChange}
        />
    </>
}
