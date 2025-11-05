import { yupResolver } from '@hookform/resolvers/yup'
import { capital, title } from 'case'
import { use, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { useForm } from 'react-hook-form'
import { LuCirclePlus, LuUpload, LuX } from 'react-icons/lu'
import { useLoaderData, useNavigate } from 'react-router'
import * as yup from "yup"
import Input from '~/components/dashboard/input'
import SearchInput from '~/components/dashboard/search-input'
import Select from '~/components/dashboard/select'
import Skills from '~/components/dashboard/skills'
import Button from '~/components/ui/button'
import { get, post } from '~/libs/axios'
import { courses, schools, type School } from '~/libs/schools'
import useAuth from '~/stores/authStore'
export const clientLoader = async () => {
  try {
    const res = await get<{ success: boolean, education: any[]; experiences: any[]; profile: { roles: string; skills: string[] }}>('profile')

    const { success, education, experiences, profile: {roles, skills}} = res.data;
    
    if (success) {
      return {
        education,
        experiences,
        roles,
        skills: skills ?? []
      }
    } else {
      return {
        education: [],
        experiences: [],
        roles: '',
        skills: []
      }
    }
  } catch (error) {
    return {
      education: [],
      experiences: [],
      roles: '',
      skills: []
    }
  }
}

const rolschema = yup
    .object({
        role: yup.string().required(),
        skills: yup.array().required(),
    })
    .required()

type Props = {}
type Form = {
    name: string;
    file: File,
    type: 'nysc' | 'degree' | 'resume';
}
const data = [{
    label: 'Resume',
    value: 'resume'
}, {
    label: 'NYSC Certificate',
    value: 'nysc'
}, {
    label: 'Degree Certificate',
    value: 'degree'
}]
const details = (props: Props) => {
    const { education, experiences, roles, skills } = useLoaderData<any>();
    const [exp, setExp] = useState(experiences)
    const [edu, setEdu] = useState(education)
    const [rol, setRol] = useState(roles)
    const [skill, setSkill] = useState(skills)
    const [active, setActive] = useState<'education' | 'experience' | 'roles'>('education');
    const navigate = useNavigate()
    const { updateStep } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragging, setDragging] = useState(false);
    const [type, setType] = useState<any>('');
    const [form, setForm] = useState<any>()
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true)
    }
    const handleDragLeave = () => {
        setDragging(false)
    }
    const skillForm = useForm({
        resolver: yupResolver(rolschema),
        defaultValues: {
            role: roles,
            skills: skills,
        }
    });
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files.item(0);
        // const is_valid = file?.type === 'application/pdf' || file?.type === ''
        setForm((pv: any) => ({
            ...pv, [type]: {
                type: type,
                file: file,
                name: file?.name
            }
        }))
        setType('')
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {

            setForm((pv: any) => ({
                ...pv, [type]: {
                    type: type,
                    file: file,
                    name: file.name
                }
            }))
            setType('')
        }
    }
    const handleUpload = async () => {
        // if()
        const fd = new FormData();
        fd.append('nysc', form.nysc.file)
        fd.append('degree', form.degree.file)
        fd.append('resume', form.resume.file)
        await post<any, { success: boolean }>('/profile/upload/documents', fd, true)
            .then(res => {
                const { success } = res.data;
                if (success) {
                    console.log(res)
                }
            })
    }

    const handleNext = async () => {
        await post<any, { success: boolean; step: number }>('/profile/pro-details/next', {})
            .then(res => {
                const { success, step } = res.data
                if (success) {
                    updateStep(step)
                    navigate('/dashboard/complete-profile/portfolio');
                }

            })
    }


    return (
        <div className="flex flex-col gap-8 max-w-5xl">
            <div className="flex justify-between flex-col md:flex-row">
                <div className="flex w-full flex-col items-start gap-[24px] max-w-md">
                    <h2 className="self-stretch text-[#0F1729] dark:text-neutral-200 text-[16px] font-bold">Upload Resume</h2>
                    <Select onChange={e => setType(e.target.value)} label="Document Type" placeholder="Select Document Type" data={data} />
                    {type && <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className="flex h-[205px] flex-col justify-center items-center gap-[16px] self-stretch rounded-[12px] border dark:border-neutral-500 bg-[#FFF] dark:bg-neutral-700">
                        <div className="flex flex-col items-center gap-[16px] self-stretch">
                            <div className="flex flex-col justify-center items-center gap-[4px] self-stretch">
                                <LuUpload size={24} />
                                <div className="flex flex-col justify-center items-center gap-[16px] self-stretch">
                                    <div className="flex flex-col justify-center items-center gap-[8px] self-stretch">
                                        <h2 className="self-stretch text-[#020817] dark:text-neutral-300 text-center text-[17px] font-bold">Upload your {capital(type)}</h2>
                                        <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center text-[14px]">Drag and drop your {capital(type)} here, or click to select</p>
                                    </div>
                                    <input ref={inputRef} accept=".docx,.doc,.pdf" type="file" className="hidden" onChange={handleFileChange} />
                                </div>
                            </div>
                            <span className="self-stretch text-[#9CA3AF] dark:text-neutral-400 text-center text-[12px]">Max file size: 10MB (PDF or DOCX)</span>
                        </div>
                    </div>}
                    {form !== undefined && <div className="flex flex-col gap-2 w-full">
                        {Object.entries(form).map((entry: any[]) => <div key={entry[0]} className="w-full flex justify-between items-center px-2 rounded-lg bg-[#F1F5F9] dark:bg-neutral-700 border dark:border-neutral-500">
                            <div className="flex flex-col">
                                <p className="text-[#0F1729] dark:text-neutral-300 leading-6">{entry[1].name}</p>
                                <span className="text-[#9CA3AF] dark:text-neutral-400 text-sm">{entry[1].type}</span>
                            </div>
                            <LuX size={28} />
                        </div>)}
                    </div>}
                    {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                    <Button onClick={handleUpload} type="button">Upload Files</Button>
                </div>
                <hr className="bg-red-500 border-r h-[350px] dark:border-neutral-500 md:block hidden" />
                <div className="flex flex-col items-start gap-[24px] max-w-md">
                    <h2 className="self-stretch text-[#0F1729] dark:text-neutral-300 text-[16px] font-bold">Manually input details</h2>
                    <div className="flex flex-col items-end gap-[14px] self-stretch">
                        <div className="flex p-[4px] items-start self-stretch rounded-[6px] bg-[#F1F5F9] dark:bg-neutral-700">
                            <button onClick={() => setActive('education')} className={`flex p-[6px] justify-center items-center gap-[10px] w-1/3 rounded-[4px] ${active === 'education' ? 'bg-[#FFF] dark:bg-neutral-600' : ''} text-center text-[14px] font-medium`}>Education</button>
                            <button onClick={() => setActive('experience')} className={`flex p-[6px] justify-center items-center gap-[10px] w-1/3 rounded-[4px] ${active === 'experience' ? 'bg-[#FFF] dark:bg-neutral-600' : ''} text-center text-[13px] font-medium`}>Experience</button>
                            <button onClick={() => setActive('roles')} className={`flex p-[6px] justify-center items-center gap-[10px] w-1/3 rounded-[4px] ${active === 'roles' ? 'bg-[#FFF] dark:bg-neutral-600' : ''} text-center text-[14px] font-medium`}>Roles & Skills</button>
                        </div>
                        <div className="flex flex-col gap-[15px] w-full">
                            {active === 'education' && <Education educations={edu} setEducations={setEdu} />}
                            {active === 'experience' && <Experience experiences={exp} setExperiences={setExp} />}
                            {active === 'roles' && <Roles form={skillForm} />}
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={handleNext} className="self-end">Next: Portfolio</Button>
        </div>
    )
}
interface FormErrors {
    [key: string]: string | undefined;
}

type Inputs = {
    professional_headline: string,
    about: string
    // email: string,
}
interface Image {
    type?: string;
    src: string;
}
const edu = yup
    .object({
        degree: yup.string().required(),
        institution: yup.string().required(),
        started_at: yup.string().required(),
        ended_at: yup.string().required(),
    })
    .required()
function Education({ educations, setEducations }: { educations: any[]; setEducations: React.Dispatch<React.SetStateAction<any[]>> }) {

    const { formState: { errors }, register, handleSubmit, setValue, reset } = useForm({
        resolver: yupResolver(edu),
        defaultValues: {
            degree: '',
            institution: '',
            started_at: '',
            ended_at: ''
        }
    });

    const onSubmit = async (form: any) => {
        try {
            const res = await post<FormData, { success: boolean; result: any }>('profile/pro-details', { ...form, type: 'education' });
            const { success, result } = res.data;
            if (success) {
                setEducations(result.education); // add form data to the list
                reset();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sch = schools.map((school: School) => school.name)
    const coursess = courses.map(course => title(course))

    return (
        <>
            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
                <SearchInput options={coursess} onChange={e => setValue('degree', e)} error={errors?.degree?.message} placeholder="Degree" />
                <SearchInput options={sch} onChange={e => setValue('institution', e)} error={errors?.institution?.message} placeholder="Institution" />
                <div className="flex md:gap-[29px] gap-[15px] w-full flex-col md:flex-row">
                    <Input {...register('started_at')} error={errors?.started_at?.message} type="date" className="w-full" placeholder="mm/dd/yy" />
                    <Input {...register('ended_at')} error={errors?.ended_at?.message} type="date" className="w-full" placeholder="mm/dd/yy" />
                </div>
                <Button className="w-full">
                    <LuCirclePlus />
                    Add Education
                </Button>
            </form>

            {educations.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Added Education</h3>
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-neutral-800">
                                <th className="p-2 border">Degree</th>
                                <th className="p-2 border">Institution</th>
                                <th className="p-2 border">Start Date</th>
                                <th className="p-2 border">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations.map((edu, i) => (
                                <tr key={i} className="text-sm text-gray-800 dark:text-neutral-300">
                                    <td className="p-2 border">{edu.degree}</td>
                                    <td className="p-2 border">{edu.institution}</td>
                                    <td className="p-2 border">{edu.started_at}</td>
                                    <td className="p-2 border">{edu.ended_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

const exp = yup
  .object({
    title: yup.string().required('Job title is required'),
    company: yup.string().required('Company name is required'),
    started_at: yup.string().required('Start date is required'),
    is_present: yup.boolean().default(false),
    ended_at: yup.string().when('is_present', {
      is: false,
      then: schema => schema.required('End date is required if not currently working'),
      otherwise: schema => schema.notRequired()
    })
  })
  .required();
function Experience({ experiences, setExperiences }: { experiences: any[]; setExperiences: React.Dispatch<React.SetStateAction<any[]>>}) {
    // const [experiences, setExperiences] = useState<any[]>(data);

    const { formState: { errors }, register, handleSubmit, reset, watch } = useForm({
        resolver: yupResolver(exp),
        defaultValues: {
            title: '',
            company: '',
            started_at: '',
            ended_at: '',
            is_present: false
        }
    });

    const onSubmit = async (form: any) => {
        try {
            const res = await post<FormData, { success: boolean; result: any }>('profile/pro-details', { ...form, type: 'experience' });
            const { success, result } = res.data;
            if (success) {
                setExperiences(result.experience);
                reset();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('title')} error={errors?.title?.message} placeholder="Job Title" />
                <Input {...register('company')} error={errors?.company?.message} placeholder="Company" />
                <label className="flex items-center gap-2">
                    <input {...register('is_present')} type="checkbox" />
                    Currently Working Here
                </label>
                <div className="flex gap-[29px] w-full flex-col md:flex-row">
                    <Input {...register('started_at')} error={errors?.started_at?.message} type="date" className="w-full" placeholder="mm/dd/yy" />
                    <Input {...register('ended_at')} disabled={watch('is_present')} error={errors?.ended_at?.message} type="date" className="w-full" placeholder="mm/dd/yy" />
                </div>
                <Button className="w-full">
                    <LuCirclePlus />
                    Add Experience
                </Button>
            </form>

            {experiences.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Added Experience</h3>
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-neutral-800">
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Company</th>
                                <th className="p-2 border">Start Date</th>
                                <th className="p-2 border">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences.map((exp, i) => (
                                <tr key={i} className="text-sm text-gray-800 dark:text-neutral-300">
                                    <td className="p-2 border">{exp.title}</td>
                                    <td className="p-2 border">{exp.company}</td>
                                    <td className="p-2 border">{exp.started_at}</td>
                                    <td className="p-2 border">{exp.is_present ? 'Present' : exp.ended_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

function Roles({ form }: { form: any;}) {
    const { formState: { errors }, register, handleSubmit, setValue, watch, reset } = form;
    console.log(watch('role'))
    const onSubmit = async (form: any) => {
        try {
            await post<FormData, { success: boolean; step: number }>('profile/pro-details', { ...form, type: 'roles' })
                .then(res => {
                    const { success } = res.data;
                    if (success) {
                        reset()
                    }
                })
            // navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('role')} error={errors?.role?.message} placeholder="Type Your Role" />
            <Skills value={watch('skills')} onSave={e => setValue('skills', e)} placeholder="Add Skills and press enter" info={<span>Add skills that are essential for the job</span>} label="Required Skills" />
            <Button className="w-full">
                <LuCirclePlus />
                Save
            </Button>
        </form>
    )
}

export default details