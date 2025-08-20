import React from 'react'

const Wave = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="1254" height="298" viewBox="0 0 1254 298" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
            <g filter="url(#filter0_d_3135_1220)">
                <path d="M1227 159.677C1171.34 194.623 1041.69 260.52 968.399 244.545C876.787 224.576 854.173 121.735 712.696 97.7726C571.22 73.8097 391.132 270.401 281.545 150.087C171.959 29.7739 174.275 -10.2566 27 6.71707" stroke="url(#paint0_linear_3135_1220)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_3135_1220" x="0.499817" y="0.499756" width="1253" height="297" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="24" />
                    <feGaussianBlur stdDeviation="12" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.203922 0 0 0 0 0.662745 0 0 0 0.3 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3135_1220" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3135_1220" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_3135_1220" x1="1227" y1="125" x2="27" y2="125" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#988AF3" />
                    <stop offset="1" stop-color="#56C9C9" />
                </linearGradient>
            </defs>
        </svg>


    )
}

export default Wave