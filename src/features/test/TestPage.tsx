import {Button} from 'antd'

export function TestPage() {
    return (
        <>
            <div>React версия в разработке...</div>
            <Button type={'primary'} onClick={() => {
                window.location.href = '/test'
            }}>Версия на Go template</Button>
        </>
    )
}
