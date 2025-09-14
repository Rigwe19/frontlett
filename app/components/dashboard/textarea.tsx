import React, { createElement, useEffect, useState, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { cn } from "~/libs/utils"

type Props = React.ComponentProps<"textarea"> & {
    error?: string
    icon?: IconType
    info?: ReactNode
    label?: string;
}

const Textarea = ({ icon, className, error, info, placeholder, label, ...props }: Props) => {
    const [id] = useState(Math.random() * 9999);
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="font-semibold" htmlFor={`input_${id}`}>{label}</label>}
            <div className='relative flex flex-col gap-1'>
                <div className="w-full relative">
                    <div className="absolute top-0 bottom-0 flex justify-center items-start w-10 py-[13px]">
                        {icon && createElement(icon, {
                            size: 20,
                            className: `${error ? 'text-[#EF4444]' : 'dark:text-neutral-400 text-neutral-700'}`,
                        })}
                    </div>
                    <textarea {...props} id={`input_${id}`} placeholder={placeholder} className={cn([`bg-white dark:bg-neutral-700 py-[13px] ${icon ? 'pl-10' : 'pl-3.5'} ${error ? 'focus-visible:border-[#EF4444] text-[#EF4444] placeholder:text-[#EF4444]' : 'focus-visible:border-[#89BDFF] placeholder:text-[#64748B] dark:placeholder:text-neutral-400'}  pr-8 border w-full border-[#E2E8F0] dark:border-neutral-500 font-general rounded-xl focus-visible:border-2 focus-visible:outline-0 `, className])} />
                </div>

                {error && <FiAlertCircle size={20} color="#EF4444" className="absolute top-3.5 right-3" />}
                {error && <span className="text-[#EF4444] font-general text-sm leading-3.5">{error?.replaceAll('_', ' ')}</span>}
                {info && <div className="text-[#64748B] dark:text-neutral-400 font-general text-sm leading-3.5 flex justify-between">{info}</div>}
            </div>
        </div>
    )
}

export default Textarea