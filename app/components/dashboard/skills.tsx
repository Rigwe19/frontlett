import React, { createElement, useEffect, useRef, useState, type KeyboardEventHandler, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { LuPlus, LuX } from 'react-icons/lu'
import { cn } from "~/libs/utils"

type Props = React.ComponentProps<"input"> & {
    error?: string
    icon?: IconType
    info?: ReactNode
    label?: string
    onSave?: (value: string[]) => void;
    value?: string[]
}
const Skills = ({ type, icon, className, error, info, placeholder, label, value, onSave, ...props }: Props) => {
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
    const [skills, setSkills] = useState(['React', 'Javascript', 'Typescript', 'UX Design', 'UI Design']);
    const [added, setAdded] = useState<string[]>(value ?? []);
    const handleAdd = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            const text = e.currentTarget.value;
            const adds = [...added];
            adds.push(text);
            e.currentTarget.value = ''
            if (adds.length === 6) return;
            setAdded(adds)
            if (onSave) onSave(adds)
        }
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
                    <div className="flex items-center gap-[8px] flex-wrap p-2">
                        {added.map((item, index) => (<div key={item} className="flex px-2 py-1 flex-col items-start gap-[10px] rounded-full border dark:border-neutral-500 bg-[#138F84]">
                            <div className="flex items-center gap-2 self-stretch">
                                <span className="flex items-center gap-[4px] self-stretch">
                                    {item}
                                </span>
                                <LuX onClick={() => handleDelete(index)} size={14} />
                            </div>
                        </div>))}
                        <input {...props} id={`input_${id}`}
                            placeholder={placeholder}
                            onKeyDown={e => handleAdd(e)}
                            onBlur={() => setActive(false)}
                            onFocus={() => setActive(true)}
                            className={cn([`bg-transparent flex items-center min-h-[46px] ${icon ? 'pl-10' : 'pl-3.5'} ${error ? 'focus-visible:border-[#EF4444] text-[#EF4444] placeholder:text-[#EF4444]' : 'focus-visible:border-[#89BDFF] placeholder:text-[#64748B] dark:placeholder:text-neutral-400'} pr-8 font-general focus-visible:border-b-2 focus-visible:outline-0 `, className])} />
                        {/* <button className="rounded-full bg-white absolute top-4 right-2 bottom-4 text-black px-4 py-1">Add Skills</button> */}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    <div className="flex justify-between items-end self-stretch gap-4">
                        <p className="text-[#64748B] dark:text-neutral-500 text-[12px]">Common skills:</p>
                        <div className="flex items-center gap-[8px] grow flex-wrap">
                            {skills.map(skill => <button type="button" onClick={() => addSkill(skill)} key={skill} className="flex w-fit p-[3px] px-2 flex-col items-start gap-[10px] rounded-full border">
                                <div className="flex items-center gap-[4px] self-stretch">
                                    <LuPlus size={10} className="text-[#0F1729] dark:text-neutral-300" />
                                    <span className="flex flex-col justify-center text-[#0F1729] dark:text-neutral-300 text-[10px] font-bold">{skill}</span>
                                </div>
                            </button>)}
                        </div>
                    </div>
                </div>
                {error && <FiAlertCircle size={20} color="#EF4444" className="absolute top-3.5 right-3" />}
                {error && <span className="text-[#EF4444] font-general text-sm leading-3.5">{error?.replaceAll('_', ' ')}</span>}
                {info && <div className="text-[#64748B] dark:text-neutral-400 font-general text-sm leading-3.5 flex justify-between">{info}</div>}
            </div>
        </div>
    )
}

export default Skills