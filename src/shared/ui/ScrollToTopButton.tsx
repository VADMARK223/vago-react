import {UpOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import * as React from 'react'
import {useEffect} from 'react'

type Props = {
    containerRef: React.RefObject<HTMLDivElement | null>
}

export function ScrollToTopButton({containerRef}: Props) {
    const [visible, setVisible] = React.useState<boolean>(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            setVisible(container.scrollTop > 30)
        }

        container.addEventListener('scroll', handleScroll)
        return () => {
            container.removeEventListener('scroll', handleScroll)
        }

    }, [containerRef])

    const scrollToTop = () => {
        containerRef?.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <Button
            type={'primary'}
            shape={'circle'}
            icon={<UpOutlined/>}
            onClick={scrollToTop}
            style={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                opacity: visible ? 1 : 0,
            }}
        />
    )
}
