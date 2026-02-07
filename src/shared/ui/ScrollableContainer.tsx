import style from './ScrollableContainer.module.css'
import * as React from 'react'
import {useRef} from 'react'
import {ScrollToTopButton} from './ScrollToTopButton.tsx'

type Props = {
    children: React.ReactNode
}

export function ScrollableContainer({children}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div className={style.scrollableWrapper}>
            <div ref={containerRef} className={style.scrollableContent}>{children}</div>
            <ScrollToTopButton containerRef={containerRef}/>
        </div>
    )
}
