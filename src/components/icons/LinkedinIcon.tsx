import * as React from 'react'

interface LinkedinIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string
    className?: string
}

export const LinkedinIcon = React.forwardRef<SVGSVGElement, LinkedinIconProps>(
    ({ size = 24, className, ...props }, ref) => (
        <svg
            ref={ref}
            fill="currentColor"
            viewBox="-271 283.9 256 235.1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            {...props}
        >
            <g>
                <rect x="-264.4" y="359.3" width="49.9" height="159.7" fill="currentColor" />
                <path
                    d="M-240.5,283.9c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7C-210.8,295.8-222.1,283.9-240.5,283.9z"
                    fill="currentColor"
                />
                <path
                    d="M-78.2,357.8c-28.6,0-46.5,15.6-49.8,26.6v-25.1h-56.1c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4V519h56.6v-88.8C-14.9,380.8-42.7,357.8-78.2,357.8z"
                    fill="currentColor"
                />
            </g>
        </svg>
    ),
)

LinkedinIcon.displayName = 'LinkedinIcon'
