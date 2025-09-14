import React, { createElement, useState, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { LuChevronDown } from 'react-icons/lu'
import { cn } from "~/libs/utils"

type Props = React.ComponentProps<"select"> & {
    error?: string
    icon?: IconType
    info?: ReactNode
    label?: string,
    placeholder?: string;
    postfix?: string;
    data?: {
        label: string;
        value: string;
    }[]
}

const Select = ({ data, icon, className, error, info, placeholder, label, postfix, ...props }: Props) => {
    const [id] = useState(Math.random() * 9999);
    const [active, setActive] = useState(false);
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="font-semibold" htmlFor={`select_${id}`}>{label}</label>}
            <div className='relative flex flex-col gap-1'>
                <div className="w-full relative">
                    {icon && <div className="absolute top-0 bottom-0 flex pointer-events-none justify-center items-center w-10">
                        {createElement(icon, {
                            size: 20,
                            className: `${error ? 'text-[#EF4444]' : 'dark:text-neutral-400 text-neutral-700'}`,
                        })}
                    </div>}
                    {postfix && <div className="absolute top-2 bottom-2 right-8 pointer-events-none p-2 flex text-white justify-center items-center rounded-full bg-primary border-gray-200 dark:border-neutral-500">
                        <span className="font-sans">₦</span>
                        <span>{postfix}</span>
                    </div>}
                    <select {...props} id={`select_${id}`} onBlur={() => setActive(false)} onFocus={() => setActive(true)} className={cn([`bg-white dark:bg-neutral-700 appearance-none h-[46px] z-[2] ${icon ? 'pl-10' : 'pl-3.5'} ${error ? 'focus-visible:border-[#EF4444] text-[#EF4444] placeholder:text-[#EF4444]' : 'focus-visible:border-[#89BDFF] placeholder:text-[#64748B] dark:placeholder:text-neutral-400'}  pr-12 border w-full border-[#E2E8F0] dark:border-neutral-500 font-general rounded-xl focus-visible:border-2 focus-visible:outline-0 `, className])}>
                        <option className="!font-sans text-black dark:text-neutral-200" value="">{placeholder}</option>
                        {data?.map(item => (
                            <option className="!font-sans text-black dark:text-neutral-200" key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute top-0 bottom-0 right-2 pointer-events-none flex justify-center items-center w-6">
                        <LuChevronDown className="absolute pointer-event-none" size={24} />
                    </div>

                </div>

                {error && <FiAlertCircle size={20} color="#EF4444" className="absolute top-3.5 right-3" />}
                {error && <span className="text-[#EF4444] font-general text-sm leading-3.5">{error?.replaceAll('_', ' ')}</span>}
                {info && <div className="text-[#64748B] dark:text-neutral-500 font-general text-sm leading-3.5 flex justify-between">{info}</div>}
            </div>
        </div>
    )
}

export default Select