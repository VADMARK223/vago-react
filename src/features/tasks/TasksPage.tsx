import {Card, Space, Typography} from 'antd'
import {useTasks} from './tasks.ts'

export function TasksPage() {
    const {data: tasks, isLoading, isError} = useTasks()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return <div className={'page'}>
        <Typography.Title level={3} style={{marginTop: 0}}>
            Список задач пользователя
        </Typography.Title>
        <div className={'scroll-box'}>
            <Space orientation={'vertical'} style={{width: '100%'}}>
                {tasks?.map((task) => (
                    <Card key={task.id}
                        title={`${task.id}. ${task.name}`}
                    >
                        {task.description}
                    </Card>
                ))}
            </Space>
        </div>
    </div>
}
