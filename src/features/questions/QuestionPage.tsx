import { Button } from 'antd';

export function QuestionPage() {
  return (
    <>
      <div>React версия в разработке...</div>
      <Button
        type="primary"
        onClick={() => {
          window.location.href = '/questions';
        }}
      >
        Версия на Go template
      </Button>
    </>
  );
}
