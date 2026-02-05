import * as React from 'react'
import {useRef} from 'react'
import {ScrollToTopButton} from './ScrollToTopButton.tsx'

type Props = {
    children: React.ReactNode
}

export function ScrollableContainer({children}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div className={'scrollable-wrapper'}>
            <div ref={containerRef} className={'scrollable-content'}>{children}</div>
            <ScrollToTopButton containerRef={containerRef}/>
        </div>
    )
}
