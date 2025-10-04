import { LuX, LuUpload, LuPlus } from 'react-icons/lu'
import Input from '~/components/dashboard/input'
import Textarea from '~/components/dashboard/textarea'
import Button from '~/components/ui/button'
import { get, post } from '~/libs/axios'
import type { Route } from './+types/portfolio'
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { motion } from 'framer-motion'
import { useLoader } from '~/stores/loaderStore'
import { useNavigate } from 'react-router'
import useAuth from '~/stores/authStore'

type Props = {}
// export async function clientLoader({ params }: Route.ClientLoaderArgs) {
//     const res = await get<{ success: boolean, portfolio: { id: number; title: string; created_at: string; time_slot: string[] }[]; applicants: number }>('/profile/portfolio')

//     const { success, portfolio } = res.data;
//     if (success) {
//         return { 
//             portfolio
//         }
//     }
// }
const Portfolio = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { alert } = useLoader()
    const { updateStep } = useAuth();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)
    const [index, setIndex] = useState<number | null>(null);
    const [portfolios, setPortfolios] = useState<{
        title: string;
        description: string;
        image: File | null;
        src: string
    }[]>([]);
    const addOne = () => {
        const port = {
            title: '',
            description: '',
            image: null,
            src: ''
        }
        const ports = [...portfolios];
        ports.push(port)
        setPortfolios(ports)
    }

    const removeOne = (index: number) => {
        const ports = [...portfolios];
        ports.splice(index, 1)
        setPortfolios(ports)
    }

    const handleChange = (index: number, value: string, key: 'title' | 'description') => {
        const ports = [...portfolios];
        ports[index][key] = value;
        if (key === 'title') {
            setIndex(index)
        }
        setPortfolios(ports)

        // return pv;
        // setPortfolios(pv => {
        //     pv[index][key] = value
        //     console.log(pv)
        //     return [...pv]
        // });
    }
    const handleFocus = (index: number) => {
        const inputElement = inputRefs.current?.[index]
        // if(inputElement?.focus)
        if (inputElement?.focus) {
            inputElement.focus()
        }

    }

    useEffect(() => {
        if (index !== null) {
            handleFocus(index)
            setIndex(null)
        }
    }, [portfolios, index]);
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true)
    }
    const handleDragLeave = () => {
        setDragging(false)
    }
    const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files.item(0);
        if (!file?.type.startsWith('image/')) {
            alert('Please upload a valid image file.', 5000, "error");
            return;
        }
        const ports = [...portfolios];
        ports[index].image = file;
        if (file) {
            ports[index].src = URL.createObjectURL(file)
        }
        setPortfolios(ports)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.item(0);
        const ports = [...portfolios];
        if (file) {
            ports[index].image = file;
            ports[index].src = URL.createObjectURL(file)
        }
        setPortfolios(ports)
    }

    const handleSubmit = async () => {
        const fd = new FormData();
        let count = 0;
        portfolios.forEach((item, index) => {
            if (item.title && item.description && item.image !== null) {
                fd.append(`portfolios[${index}][title]`, item.title)
                fd.append(`portfolios[${index}][description]`, item.description)
                fd.append(`portfolios[${index}][image]`, item.image)
                count += 1;
            } else {
                alert('Some field are empty', 5000, "error");
                return
            }
        })
        // console.log(fd)
        // if (count < 3) {
        //     alert('you need at least 3 portfolio', 5000, "error");
        //     return
        // }
        await post<any, { success: boolean; step: number }>('/profile/save-portfolio', fd, true)
            .then(res => {
                const { success, step } = res.data;
                if (success) {
                    navigate('/dashboard/complete-profile/readiness-checklist')
                    updateStep(step)
                }
            })
    }



    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-3xl font-bold text-[#0f1729] dark:text-neutral-200 mb-8">Showcase your work</h1>

            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-200">Your Projects</h2>
                    <p className="text-[#64748b] dark:text-neutral-400">Add at least 3 projects to showcase your expertise.</p>
                </div>
                <div className="text-[#2563eb] dark:text-neutral-200 font-medium">
                    <span className="text-amber-500">{portfolios.length}/3</span> completed
                </div>
            </div>

            {/* Project Form */}
            {portfolios.map((port, index) => <div key={`${index}_${port.title}`} className="border border-[#e2e8f0] dark:border-neutral-500 rounded-lg p-4 mb-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">Project {index + 1}</h3>
                    <button onClick={() => removeOne(index)} className="text-[#64748b] dark:text-neutral-400 hover:text-[#0f1729] dark:hover:text-neutral-200">
                        <LuX size={20} />
                    </button>
                </div>
                <Input ref={el => { inputRefs.current[index] = el }} value={port.title} onChange={e => handleChange(index, e.target.value, 'title')} label="Title" />
                <Textarea value={port.description} onChange={e => handleChange(index, e.target.value, 'description')} id="description" className="" rows={5} label="Description" />

                <div>
                    <label className="block text-[#0f1729] dark:text-neutral-200 font-medium mb-2">Project Image</label>
                    <motion.div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        animate={{ borderColor: dragging ? '#2563eb' : 'gray' }}
                        onDrop={e => handleDrop(e, index)}
                        onClick={() => inputRef.current?.click()}
                        className="border border-[#64748b] h-xl dark:border-neutral-500 bg-[#f1f5f9] dark:bg-neutral-700 rounded-lg p-12 flex flex-col items-center justify-center text-center relative">
                        <LuUpload className="text-[#64748b] dark:text-neutral-400 mb-2" size={24} />
                        <p className="text-[] dark:text-neutral-400">Drop an image or click to browse</p>
                        <input ref={inputRef} accept="image/*" type="file" className="hidden" onChange={e => handleFileChange(e, index)} />
                        {port.src && <img src={port.src} alt={port.title ? `Project image for ${port.title}` : ''} className="w-xl aspect-video" />}
                    </motion.div>
                </div>
            </div>)}

            {/* Add Another Project Button */}
            <Button onClick={addOne} variant="outline" className="text-[#2563eb] dark:text-neutral-200 w-full border-[#64748b] dark:border-neutral-500">
                <LuPlus /> Add Another Project
            </Button>
            <Button onClick={handleSubmit} className="self-end mt-4">Next: Readiness Checklist</Button>
        </div>
    )
}

export default Portfolio