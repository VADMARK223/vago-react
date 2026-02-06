import {Button} from 'antd'

export function TasksPage() {
    return (
        <>
            <div>React версия в разработке...</div>
            <Button type={'primary'} onClick={() => {
                window.location.href = '/tasks'
            }}>Версия на Go template</Button>
        </>

    )


    /*const {data: tasks, isLoading, isError} = useTasks()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return <div className={'page'}>
        <Typography.Title level={3} style={{marginTop: 0}}>
            Список задач пользователя
        </Typography.Title>
        <ScrollableContainer>
            <Space orientation={'vertical'} style={{width: '100%'}}>
                {tasks?.map((task) => (
                    <Card key={task.id}
                          title={`${task.id}. ${task.name}`}
                    >
                        {task.description}
                    </Card>
                ))}
            </Space>
        </ScrollableContainer>
    </div>*/
}
