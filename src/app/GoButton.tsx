import {GoogleOutlined} from '@ant-design/icons'
import {Button} from 'antd'

interface Props {
    isPhone?: boolean
}

export function GoButton({isPhone}:Props) {
    return (
        <Button type={'primary'} color={'volcano'} variant={'solid'}
                onClick={() => {
                    window.location.href = '/'
                }}
                icon={<GoogleOutlined/>}
        >
            {!isPhone && ('Портал на Golang')}
        </Button>
    )
}
