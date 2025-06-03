import type { SVGProps } from "react";

export interface SVGIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
    className?: string;
}