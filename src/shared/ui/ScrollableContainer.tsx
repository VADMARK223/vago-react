import * as React from 'react'
import {useRef} from 'react'
import {ScrollToTopButton} from './ScrollToTopButton.tsx'

type Props = {
    children: React.ReactNode
}

export function ScrollableContainer({children}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div ref={containerRef} className={'scroll-box'} style={{position: 'relative'}}>{children}</div>
            <ScrollToTopButton containerRef={containerRef}/>
        </>
    )
}
