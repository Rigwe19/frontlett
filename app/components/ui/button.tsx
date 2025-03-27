import { cn } from "~/libs/utils"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, ...props }: Props) => {
    return (
        <button className={cn(['bg-gradient-to-b from-primary to-[#0B4C8D] hover:from-[#0B4C8D] hover:to-primary cursor-pointer text-white rounded-xl px-8 py-3.5 text-base font-semibold flex gap-2.5 items-center transition-colors justify-center font-proxima font-semibold', className])}>
            {children}
        </button>
    )
}

export default Button