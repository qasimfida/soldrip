import { cn } from "@/lib/utils"
import type { TitleProps } from "@/types/title"

const TYPES = {
  heading: ' text-2xl md:text-[26px]  text-white font-roboto font-bold',
  title: 'text-4xl text-gradient-primary text-4xl text-center  md:text-[40px] font-gugi font-bold uppercase',
}

const Title = ({ children, className, type = 'title' }: TitleProps) => {
  return (
    <h2 className={cn(`${TYPES[type]}`, className)}>
      {children}
    </h2>
  )
}

export default Title