import { cn } from "@/lib/utils"
import type { TitleProps } from "@/types/title"

const TYPES = {
  heading: 'text-2xl md:text-[32px] text-white font-bold',
  title: 'text-3xl text-center md:text-[40px] font-bold uppercase',
}

const Title = ({ children, className, type = 'title', highlight }: TitleProps) => {
  return (
    <h2 className={cn(`${TYPES[type]}`, "mb-2", className)}>
      {highlight && <span className="text-gradient-primary-linear" >{highlight}</span>}{children && <span className="text-gradient-white" >{children}</span>}
    </h2>
  )
}

export default Title