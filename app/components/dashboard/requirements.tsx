import React, { createElement, useEffect, useRef, useState, type KeyboardEventHandler, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { LuCircleCheckBig, LuPlus, LuX } from 'react-icons/lu'
import { cn } from "~/libs/utils"
import Button from '../ui/button'

type Props = React.ComponentProps<"input"> & {
    error?: string
    icon?: IconType
    info?: ReactNode
    label?: string
    onSave?: (value: string[]) => void;
    value?: string[]
}
const Requirements = ({ type, icon, className, error, info, placeholder, label, value, onSave, ...props }: Props) => {
    const [computedType, setComputedType] = useState(type);
    const [id, setId] = useState(Math.random() * 9999);
    const divRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (type !== 'password') return
        if (active) {
            setComputedType('text')
        } else {
            setComputedType('password')
        }
    }, [active]);
    const [text, setText] = useState('');
    const [skills, setSkills] = useState(['React', 'Javascript', 'Typescript', 'UX Design', 'UI Design']);
    const [added, setAdded] = useState<string[]>(value ?? []);
    const handleAdd = (e: any) => {
        if (e.key === 'Enter') {
            if (!text) return
            e.preventDefault()
            e.stopPropagation()
            const adds = [...added];
            adds.push(text);
            if (adds.length === 6) return;
            setAdded(adds)
            setText('')
            if (onSave) onSave(adds)
        }
    }
    const handleButton = () => {
        if (!text) return
        const adds = [...added];
        adds.push(text);
        if (adds.length === 6) return;
        setAdded(adds)
        setText('')
        if (onSave) onSave(adds)
    }
    const handleDelete = (index: number) => {
        const adds = [...added];
        adds.splice(index, 1);
        setAdded(adds)
        if (onSave) onSave(adds)
    }

    const addSkill = (skill: string) => {
        const adds = [...added];
        adds.push(skill);
        const sk = [...skills]
        const idx = sk.findIndex(value => skill === value);
        sk.splice(idx, 1);
        if (adds.length === 6) return;
        setAdded(adds)
        setSkills(sk)
        if (onSave) onSave(adds)

    }


    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="font-semibold" htmlFor={`input_${id}`}>{label}</label>}
            <div className='relative flex flex-col gap-2'>
                <div className="w-full relative flex flex-col gap-2 overflow-hidden border border-[#E2E8F0] dark:border-neutral-500 rounded-xl">
                    <div className="absolute top-0 bottom-0 flex justify-center items-center w-10">
                        {icon && createElement(icon, {
                            size: 20,
                            className: `${error ? 'text-[#EF4444]' : 'dark:text-neutral-400 text-neutral-700'}`,
                        })}
                    </div>
                    <div className="flex items-center gap-[8px] p-2">
                        <input {...props} id={`input_${id}`}
                            placeholder={placeholder}
                            onKeyDown={e => handleAdd(e)}
                            onChange={e => setText(e.target.value)}
                            value={text}
                            onBlur={() => setActive(false)}
                            onFocus={() => setActive(true)}
                            className={cn([`bg-white dark:bg-neutral-700 flex items-center min-h-[46px] ${icon ? 'pl-10' : 'pl-3.5'} ${error ? 'focus-visible:border-[#EF4444] text-[#EF4444] placeholder:text-[#EF4444]' : 'focus-visible:border-[#89BDFF] placeholder:text-[#64748B] dark:placeholder:text-neutral-400'} pr-8 font-general focus-visible:border-b-2 focus-visible:outline-0 w-full`, className])} />
                        <Button onClick={handleButton} className="h-10">Add</Button>
                    </div>
                    {added.map((item, index) => (<div key={item} className="flex px-2 py-1 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <LuCircleCheckBig color="#22c55e" />
                            <span className="text-[#64748b] dark:text-neutral-400">{item}</span>
                        </div>
                        <LuX onClick={() => handleDelete(index)} size={14} />
                    </div>))}
                </div>
                {error && <FiAlertCircle size={20} color="#EF4444" className="absolute top-3.5 right-3" />}
                {error && <span className="text-[#EF4444] font-general text-sm leading-3.5">{error?.replaceAll('_', ' ')}</span>}
                {info && <div className="text-[#64748B] dark:text-neutral-400 font-general text-sm leading-3.5 flex justify-between">{info}</div>}
            </div>
        </div>
    )
}

export default Requirements