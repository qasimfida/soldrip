export interface WhyDripItem {
    title?: string | React.ReactNode;
    description?: string;
    highlight?: string | React.ReactNode;
    icon?: React.ReactNode | React.FC<React.SVGProps<SVGSVGElement>> | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    name?: string;
}
export interface WhyDripProps {
    title?: string | React.ReactNode;
    description?: string;
    highlight?: string | React.ReactNode;
    options: WhyDripItem[];
}