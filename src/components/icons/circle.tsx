import React from 'react'

const Circle = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="24" cy="24" r="16" fill="currentColor" />
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="8" />
        </svg>
    )
}

export default Circle