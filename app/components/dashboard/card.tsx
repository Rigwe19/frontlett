import React, { createElement } from 'react'
import type { IconType } from 'react-icons'
import { LuChevronRight } from 'react-icons/lu'
import { Link } from 'react-router'

type Props = {
    active?: boolean
    option?: {
        icon: IconType,
        title: string;
        description: string;
        to: string
    }
    onClick?: VoidFunction
}

const Card = ({ active, option, onClick }: Props) => {
    return (
        <Link to={{
            pathname: option?.to,
            search: `?option=${option?.title?.toLowerCase()}`,
        }} onClick={() => onClick ? onClick() : null} className={`w-full cursor-pointer aspect-[16_/_5] flex flex-col gap-2.5 px-2.5 py-2 ${active ? 'border-primary border-2 bg-[#F0F4FF] dark:bg-gray-700' : 'border dark:border-neutral-500 bg-white dark:bg-neutral-700'} rounded-xl`}>
            {option?.icon && <div className="rounded-full bg-[#EFF6FF] h-12 w-12 flex justify-center items-center">
                {createElement(option.icon, {
                    size: 28,
                    color: '#2563EB'
                })}
            </div>}
            <div className="flex justify-between">
                <h3 className="font-bold text-lg leading-7">{option?.title}</h3>
                {active && <LuChevronRight color="#1279E0" />}
            </div>

            <p className="text-[#64748B] dark:text-neutral-300">{option?.description}</p>
        </Link>
    )
}

export default Card