import { Button } from 'antd';

export function ChatPage() {
  return (
    <>
      <div>React версия в разработке...</div>
      <Button
        type="primary"
        onClick={() => {
          window.location.href = '/chat';
        }}
      >
        Версия на Go template
      </Button>
    </>
  );
}
