import React from 'react'

const CircleHighlight = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}  >
            <circle cx="24" cy="24" r="16" fill="url(#paint0_linear_3138_2565)" />
            <circle cx="24" cy="24" r="20" stroke="#D12A2A" strokeOpacity="0.3" strokeWidth="8" />
            <defs>
                <linearGradient id="paint0_linear_3138_2565" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D12A2A" />
                    <stop offset="1" stopColor="#070F71" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default CircleHighlight