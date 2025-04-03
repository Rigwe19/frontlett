import { cn } from "~/libs/utils"
import React from 'react'
import { Link, type LinkProps } from 'react-router'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean
    to?: LinkProps["to"]
}

const Button = ({ children, className, outline, to, ...props }: Props) => {
    if (to) {
        return <Link to={to} className={cn([`${!outline ? 'bg-gradient-to-b from-primary to-[#0B4C8D] hover:from-[#0B4C8D] hover:to-primary text-white' : 'border border-primary hover:bg-primary hover:border-white text-primary hover:text-white'} cursor-pointer rounded-xl px-4 md:px-8 py-3.5 text-base font-semibold flex gap-2.5 items-center transition-colors justify-center font-proxima font-semibold`, className])}>
            {children}
        </Link>
    }
    return (
        <button className={cn([`${!outline ? 'bg-gradient-to-b from-primary to-[#0B4C8D] hover:from-[#0B4C8D] hover:to-primary text-white' : 'border border-primary hover:bg-primary hover:border-white text-primary hover:text-white'} cursor-pointer rounded-xl px-4 md:px-8 py-3.5 text-base font-semibold flex gap-2.5 items-center transition-colors justify-center font-proxima font-semibold`, className])} {...props}>
            {children}
        </button>
    )
}

export default Button