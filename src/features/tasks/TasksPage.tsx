import styles from './TaskPage.module.css';
import { App, Button, Card, Checkbox, Empty, Form, Input, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { type TaskRequest, useCreateTask, useTasks, useUpdateTaskMutation } from './tasks';
import { ScrollableContainer } from '@/shared/ui';
import { CODE } from '@/shared/constants';
import TextArea from 'antd/es/input/TextArea';
import { getKyErrorMessage } from '@/shared/api/ky-client';
import { DeleteTaskButton } from './DeleteTaskButton';
import dayjs from 'dayjs';
import { HStack } from '@/shared/ui/h-stack/HStack';
import { VStack } from '@/shared/ui/v-stack/VStack';

export function TasksPage() {
  const { message } = App.useApp();
  const { data: tasks, isLoading, isError } = useTasks();
  const createTask = useCreateTask();
  const updateTaskMutation = useUpdateTaskMutation();
  const [form] = Form.useForm();
  const name: string = Form.useWatch(CODE.NAME, form);
  const isDisabled: boolean = !name;

  if (isError) {
    return <div>Error</div>;
  }

  const onFinish = (req: TaskRequest) => {
    createTask.mutate(req, {
      onError: async (err) => {
        const serverMsg = await getKyErrorMessage(err);
        message.error(serverMsg ?? 'Ошибка создания задачи');
      },
    });
  };

  return (
    <div className={styles.page}>
      <Form<TaskRequest> form={form} style={{ marginBottom: '8px' }} onFinish={onFinish}>
        <Form.Item
          name={CODE.NAME}
          rules={[{ required: true, message: 'Введите наименование задачи' }]}
        >
          <Input placeholder="Наименование задачи" maxLength={255} allowClear />
        </Form.Item>

        <Form.Item name={CODE.DESCRIPTION} help={null} style={{ marginBottom: 8 }}>
          <TextArea placeholder="Описание задачи" allowClear />
        </Form.Item>

        <Form.Item
          name={CODE.COMPLETED}
          valuePropName="checked"
          initialValue={false}
          style={{ marginBottom: 8 }}
        >
          <Checkbox>Выполнена</Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isDisabled}
          icon={<PlusCircleOutlined />}
          block
        >
          Создать задачу
        </Button>
      </Form>
      <div className={styles.listArea}>
        <Spin spinning={isLoading} tip="Загрузка..." size="large">
          <ScrollableContainer>
            {tasks && tasks.length === 0 ? (
              <Empty description="Список задач пуст" />
            ) : (
              <VStack>
                {tasks?.map((task) => (
                  <Card
                    key={task.id}
                    title={
                      <span className={task.completed ? styles.taskTitleCompleted : undefined}>
                        {task.name}
                      </span>
                    }
                    extra={
                      <HStack>
                        <Checkbox
                          checked={task.completed}
                          style={{ color: task.completed ? 'green' : undefined }}
                          onChange={(e) => {
                            updateTaskMutation.mutate({
                              id: task.id,
                              completed: e.target.checked,
                            });
                          }}
                        >
                          Выполнена
                        </Checkbox>
                        <DeleteTaskButton id={task.id} />
                      </HStack>
                    }
                  >
                    <div className={styles.taskBody}>{task.description}</div>

                    <div className={styles.taskFooter}>
                      Создана: {dayjs(task.createdAt).format('DD.MM.YYYY HH:mm')}
                    </div>
                  </Card>
                ))}
              </VStack>
            )}
          </ScrollableContainer>
        </Spin>
      </div>
    </div>
  );
}
