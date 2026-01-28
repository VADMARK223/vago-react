import { Typography } from "antd";

export function HomePage() {
    return (
        <div>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
                Главная
            </Typography.Title>
            <Typography.Paragraph>
                Тут будет дашборд: прогресс, последние уроки, задачи.
            </Typography.Paragraph>
        </div>
    )
}