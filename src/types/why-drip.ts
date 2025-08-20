export interface WhyDripItem {
    title?: string;
    description?: string;
    highlight?: string;
    icon?: React.ReactNode | React.FC<React.SVGProps<SVGSVGElement>> | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    name?: string;
}
export interface WhyDripProps {
    title?: string;
    description?: string;
    highlight?: string;
    options: WhyDripItem[];
}