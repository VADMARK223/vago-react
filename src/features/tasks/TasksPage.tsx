import {Card, Space, Typography} from 'antd'

export function TasksPage() {
    return <div className={'page'}>
        <Typography.Title level={3} style={{marginTop: 0}}>
            Список задач пользователя
        </Typography.Title>
        <Typography.Paragraph>
            Тут будет список задач
        </Typography.Paragraph>
        <div className={'scroll-box'}>
            <Space orientation={'vertical'} style={{width: '100%'}}>
                <Card title={'🧠 Заголовок задачи'}>Описание задачи.</Card>
                <Card title={'🧠 Заголовок задачи'}>Описание задачи.</Card>
                <Card title={'🧠 Заголовок задачи'}>Описание задачи.</Card>
                <Card title={'🧠 Заголовок задачи'}>Описание задачи.</Card>
                <Card title={'🧠 Заголовок задачи'}>Описание задачи.</Card>
            </Space>
        </div>
    </div>
}
