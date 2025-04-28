import React, { createElement, useState, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { cn } from '~/libs/utils'

type Props = React.ComponentProps<"input"> & {
  error?: string
  icon?: IconType
  info?: ReactNode
  label?: string;
  prefix?: string;
  options?: string[];
  onChange?: (value:any) => void
}

const SearchInput = ({ type, icon, className, error, info, placeholder, label, prefix, options = [], ...props }: Props) => {
  const [id, setId] = useState(Math.random() * 9999);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase())).splice(0, 5)

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value)
    setIsOpen(true)
  }

  const handleSelectOption = (option: string) => {
    setSearchTerm(option)
    setIsOpen(false)
    props.onChange && props.onChange(option)
  }


  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="font-semibold" htmlFor={`input_${id}`}>{label}</label>}
      <div className='relative flex flex-col gap-1'>
        <div className="w-full relative">
          <div className="absolute top-0 bottom-0 flex justify-center items-center w-10">
            {icon && createElement(icon, {
              size: 20,
              className: `${error ? 'text-[#EF4444]' : 'dark:text-neutral-400 text-neutral-700'}`,
            })}
            {prefix && <span className="text-center text-[16px] font-semibold text-[#64748B] dark:text-neutral-300">{prefix}</span>}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            // onClick={() => setIsOpen(!isOpen)}
            id={`input_${id}`}
            // onBlur={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={cn([`bg-white dark:bg-neutral-700 py-[13px] h-[46px] ${(icon || prefix) ? 'pl-10' : 'pl-3.5'} ${error ? 'focus-visible:border-[#EF4444] text-[#EF4444] placeholder:text-[#EF4444]' : 'focus-visible:border-[#89BDFF] placeholder:text-[#64748B] dark:placeholder:text-neutral-400'}  pr-8 border w-full border-[#E2E8F0] dark:border-neutral-500 font-general rounded-xl focus-visible:border-2 focus-visible:outline-0 `, className])}
          />
          {isOpen && <ul className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-700 z-30">
            {filteredOptions.map((option) => <li className="py-2.5 px-2 border-b dark:border-b-neutral-500 hover:bg-white/60 dark:hover:bg-neutral-600" key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </li>)}
          </ul>}
        </div>

        {error && <FiAlertCircle size={20} color="#EF4444" className="absolute top-3.5 right-3" />}
        {error && <span className="text-[#EF4444] font-general text-sm leading-3.5">{error?.replaceAll('_', ' ')}</span>}
        {info && <div className="text-[#64748B] dark:text-neutral-400 font-general text-sm leading-3.5 flex justify-between">{info}</div>}
      </div>
    </div>
  )
}

export default SearchInput