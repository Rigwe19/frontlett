import React, { createElement, useEffect, useState, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { cn } from "~/libs/utils"
import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

type Props = {
    error?: string
    icon?: IconType
    info?: ReactNode
    label?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value:any) => void
}

const RichText = ({ icon, className, error, info, placeholder, label, onChange, ...props }: Props) => {
    const { quill, quillRef } = useQuill({
        theme: 'bubble',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ align: [] }],
                [{list: 'ordered'}, {list: 'bullet'}],
                [{size: ['small', false, 'large', 'huge']}],
                [{header: [1,2,3,4,5,6, false]}],
                [{color: []}],
            ],
            clipboard: {
                matchVisual: false
            }
        },
        placeholder,
    });
    const [id] = useState(Math.random() * 9999);
    const [active, setActive] = useState(false);
    useEffect(() => {
        if(quill){
            quill.on('text-change', (delta, oldDelta, source) => {
                // console.log(quill.root.innerHTML)
                // onChange({target: {value: quill.root.innerHTML}})
                onChange(quill.root.innerHTML)
            });
        }
    }, [quill]);
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
                    </div>
                    <div id={`input_${id}`} onBlur={() => setActive(false)} onFocus={() => setActive(true)} className={` h-[240px] border border-input bg-transparent dark:bg-neutral-700 text-neutral-800 dark:text-white rounded-lg focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-neutral-500 ${active?'!border-blue-200 border-2':''} ${error ? 'border-[#EF4444]' : ''}`}>
                        <div ref={quillRef} />
                    </div>
                </div>

                {error && <FiAlertCircle size={20} color="#EF4444" className="absolute top-3.5 right-3" />}
                {error && <span className="text-[#EF4444] font-general text-sm leading-3.5">{error?.replaceAll('_', ' ')}</span>}
                {info && <div className="text-[#64748B] dark:text-neutral-400 font-general text-sm leading-3.5 flex justify-between">{info}</div>}
            </div>
        </div>
    )
}

export default RichText