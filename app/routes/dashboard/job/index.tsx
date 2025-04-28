import { yupResolver } from '@hookform/resolvers/yup';
import { createElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuBrainCircuit, LuBriefcase, LuCalendar, LuCircleCheckBig, LuClock, LuGlobe, LuPlus, LuUser } from 'react-icons/lu';
import { GiLevelEndFlag } from 'react-icons/gi';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import Input from '~/components/dashboard/input';
import Select from '~/components/dashboard/select';
import Skills from '~/components/dashboard/skills';
import Textarea from '~/components/dashboard/textarea';
import Button from '~/components/ui/button';
import { post } from '~/libs/axios';
import { days, tabs, times, tips, levels } from '~/libs/job_data';
import type { Route } from '../+types/dashboard';
import Requirements from '~/components/dashboard/requirements';
import RichText from '~/components/dashboard/rich-text';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Post a Job" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}

interface FormData {
    title?: string;
    description?: string;
    time_slot?: any[];
    skills?: string[];
    rate?: number;
    visibility?: string; //'public' | 'invite';
    experience?: string;
    education?: string;
    level?: string;
    requirements?: string[]
}


const daySchema = yup.object({
    day: yup.string().required(),
    start: yup.string().required(),
    end: yup.string().required(),
});
type Props = {}
const Index = (props: Props) => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate()
    // Define a single Yup schema for all form fields with conditional validation
    const allStepsSchema = yup.object({
        title: yup.string().when('active', {
            is: () => active >= 0,
            then: (schema) => schema.required()
        }),
        description: yup.string().when('active', {
            is: () => active >= 0,
            then: (schema) => schema.required()
        }),
        experience: yup.string().when('active', {
            is: () => active >= 0,
            then: (schema) => schema.required()
        }),
        education: yup.string().when('active', {
            is: () => active >= 0,
            then: (schema) => schema.required()
        }),
        level: yup.string().when('active', {
            is: () => active >= 0,
            then: (schema) => schema.required()
        }),
        time_slot: yup.array().when('active', {
            is: () => active >= 1,
            then: (schema) => schema.required()
        }),
        requirements: yup.array().when('active', {
            is: () => active >= 1,
            then: (schema) => schema.required()
        }),
        skills: yup.array().when('active', {
            is: () => active >= 1,
            then: (schema) => schema.required()
        }),
        rate: yup.number().when('active', {
            is: () => active >= 2,
            then: (schema) => schema.required()
        }),
        visibility: yup.string().when('active', {
            is: () => active >= 2,
            then: (schema) => schema.required()
        }),
    });
    const [sErrors, setSErrors] = useState({
        title: undefined,
        description: undefined,
        experience: undefined,
        education: undefined,
        level: undefined
    });
    const [timeSlot, setTimeSlot] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch, trigger, setValue, getValues } = useForm<FormData>({
        resolver: yupResolver(allStepsSchema),
        mode: 'onSubmit', // Or 'onBlur' etc.
        defaultValues: {
            title: '',
            description: '',
            time_slot: [],
            skills: [],
            rate: 0,
            visibility: 'public',
            experience: '',
            education: '',
            level: ''
        }
        // context: { activeStep }, // Pass the activeStep to the validation context
    });
    const initialDay = {
        day: '',
        start: '',
        end: ''
    }
    const [dayForm, setDayForm] = useState(initialDay);
    useEffect(() => {
        if (dayForm.start) {
            const index = times.findIndex(value => value === dayForm.start);

            setDayForm(pv => ({ ...pv, end: times[index + 2] }))
        }
    }, [dayForm.start]);
    const handleChange = (field: string, value: string) => {
        setDayForm(pv => ({ ...pv, [field]: value }));
    }

    const addSlot = () => {
        const value = watch('time_slot')
        value?.push(dayForm)
        setValue('time_slot', value)
        setDayForm(initialDay)
    }

    const handleCopy = () => {
        const newValue = days.map(day => ({
            day: day.value,
            start: dayForm.start,
            end: dayForm.end
        }))
        setValue('time_slot', newValue)
        setDayForm(initialDay)
    }
    const [error, setError] = useState('');
    const onSubmit = async (data: FormData) => {
        if (active === 1) {
            if (watch('time_slot')?.length === 0) return setError('You need to set at least on time slot')
        }
        if (active === 2) {
            if (watch('rate') === 0) return setError('Rate can not be 0')
        }
        if (active === 3) {
            saveForm()
            return;
        }
        setError('')
        setActive(pv => pv + 1)
    };

    const saveForm = async () => {
        const form:FormData  = {...getValues()}
        await post<any, { success: boolean }>('/jobs/create', form)
            .then(res => {
                const { success } = res.data;
                if (success) {
                    navigate('/dashboard/home')
                }
            })
    }

    return (
        <div className="">
            <div className="flex w-full flex-col items-start my-4">
                <h2 className="self-stretch text-[#0F1729] dark:text-neutral-300 text-[23px] font-bold">Post a New Job</h2>
                <span className="self-stretch text-[#64748B] dark:text-neutral-500 text-[16px]">Create a job posting to find the perfect candidate for your project</span>
            </div>
            <div className="md:grid md:grid-cols-3 flex flex-col gap-4">
                <div className="md:col-span-2 flex flex-col items-start gap-[21px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-[25px] self-stretch">
                        <div className="flex p-px flex-col items-start gap-[10px] self-stretch border-b dark:border-b-neutral-500 bg-[#F1F5F9] dark:bg-neutral-800">
                            <div className="flex items-center gap-1 self-stretch">
                                {tabs.map((tab, index) => <div key={tab} className={`flex h-[37px] px-4 py-1.5 justify-center items-center gap-[10px] ${index === active ? 'bg-white dark:bg-neutral-700 border-b-2 border-primary mt-0.5 -mb-0.5 mx-0.5' : ''}`}>
                                    <p className="text-[#0F1729] dark:text-neutral-300 text-center text-[12px] font-medium">{tab}</p>
                                </div>)}
                            </div>
                        </div>
                        {active === 0 && <div className="flex p-[25px] flex-col items-start gap-2.5 self-stretch rounded-[12px] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                            <div className="flex flex-col items-start gap-[19px] self-stretch">
                                <div className="flex flex-col items-start gap-2 self-stretch">
                                    <div className="flex flex-col items-start gap-[11px] self-stretch">
                                        <Input {...register("title")} error={sErrors.title ?? errors.title?.message} inputMode='url' type="text" placeholder="Eg: UI Designer for 2 hours slots" info={<span>Be specific about the role and time commitment</span>} label="Job Title" />
                                        <RichText onChange={e=>setValue('description', e)} error={sErrors.description ?? errors.description?.message} placeholder="Describe the job requirements, responsibilities and deliverables" info={<span>Include key information about the project, deliverables, and expectations</span>} label="Job Description" />
                                        <Input {...register("experience")} error={sErrors.experience ?? errors.experience?.message} inputMode='text' type="text" placeholder="2-3 Years"label="Experience" />
                                        <Input {...register("education")} error={sErrors.education ?? errors.education?.message} inputMode='text' type="text" placeholder="Bachelor's degree in Design or related field"label="Education" />
                                        <Select {...register("level")} data={levels} error={sErrors.level ?? errors.level?.message} placeholder="Select Level" label="Job Level" />
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {active === 1 && <div className="flex p-[25px] flex-col items-start gap-[10px] self-stretch rounded-[12px] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                            <div className="flex flex-col items-start gap-[27px] self-stretch">
                                <div className="flex p-0 items-center self-stretch">
                                    <div className="flex flex-col items-start gap-4 w-full">
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            <h2 className="self-stretch text-[#0F1729] dark:text-neutral-300 text-[18px] font-medium">Time Slot Requirements</h2>
                                            <span className="self-stretch text-[#64748B] dark:text-neutral-400 text-[16px]">Select the time slots when you need the candidate to be available</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-[41px] self-stretch">
                                            <div className="flex justify-between items-center self-stretch">
                                                <h2 className="text-[#0F1729] dark:text-neutral-300 text-[16px] font-medium">Your Availability</h2>
                                                <div className="flex p-[6px] flex-col items-start gap-[10px] rounded-3 bg-[#F0F5FF] dark:bg-neutral-600 rounded-xl">
                                                    <button type="button" onClick={() => setTimeSlot(true)} className="flex items-center gap-[6px] self-stretch">
                                                        <LuPlus className="text-[#1C4FBD] dark:text-neutral-300" />
                                                        <div className="text-[#1C4FBD] dark:text-neutral-300 text-center text-[12px] font-medium">Add Time Slot</div>
                                                    </button>
                                                </div>
                                            </div>
                                            {timeSlot && <div className="flex w-full p-[17px] flex-col items-start gap-[10px] rounded-[12px] border dark:border-neutral-500 bg-[rgba(0,_0,_0,_0.00)]">
                                                <div className="flex flex-col items-start gap-[16px] self-stretch">
                                                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-1 md:gap-4">
                                                        <Select value={dayForm.day} onChange={e => handleChange('day', e.target.value)} data={days} label="Day" placeholder="Select Day" />
                                                        <Select value={dayForm.start} onChange={e => handleChange('start', e.target.value)} data={times.map(time => ({ label: time, value: time }))} label="Start Time" placeholder="Start Time" />
                                                        <Select value={dayForm.end} onChange={e => handleChange('end', e.target.value)} data={times.map(time => ({ label: time, value: time }))} label="End Time" placeholder="End Time" />
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
                                                        <div className="flex gap-2 flex-col md:flex-row">
                                                            <Button type="button" onClick={addSlot} className="h-10">Add Slot</Button>
                                                            <Button type="button" onClick={handleCopy} className="h-10 bg-[#F0F5FF] dark:bg-neutral-600" outline>Copy to All Weekdays</Button>
                                                        </div>
                                                        <Button type="button" onClick={() => setTimeSlot(false)} className="h-10 dark:border-neutral-400 border-[#64748B] text-[#64748B] dark:text-neutral-400 hover:bg-red-500/40" outline>Cancel</Button>
                                                    </div>
                                                </div>
                                                {(watch('time_slot')?.length ?? 0) > 0 && <div className="flex flex-col w-full">
                                                    <div className="grid grid-cols-3">
                                                        <span className="text-[#0F1729] dark:text-neutral-300">Day</span>
                                                        <span className="text-[#0F1729] dark:text-neutral-300">Start Time</span>
                                                        <span className="text-[#0F1729] dark:text-neutral-300">End Time</span>
                                                    </div>
                                                    <div className="mb-6">
                                                        <h3 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-3">Time Slots</h3>
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                            {watch('time_slot')?.map(time => <div key={time.day} className="bg-[#f1f5f9] dark:bg-neutral-600 p-4 rounded-xl flex items-center">
                                                                <LuCalendar className="w-5 h-5 mr-3 text-[#64748b] dark:text-neutral-300" />
                                                                <div>
                                                                    <span className="font-medium text-[#0f1729] dark:text-neutral-300 mr-2">{time.day}</span>
                                                                    <span className="text-[#64748b] dark:text-neutral-300">{time.start}-{time.end}</span>
                                                                </div>
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                </div>}
                                            </div>}
                                            {!timeSlot && <div className="flex w-full flex-col items-center gap-[4px]">
                                                <div className="flex flex-col items-center gap-[8px]">
                                                    <LuClock size={40} className="text-[#0F1729] dark:text-neutral-300" />
                                                    <span className="self-stretch text-[#0F1729] dark:text-neutral-300 text-center text-[16px] font-medium">No time slots added</span>
                                                </div>
                                                <p className="self-stretch text-[#64748B] dark:text-neutral-500 text-center text-[13px]">Add your available time slots to get matched with projects.</p>
                                                {error && <span className="text-sm text-red-500">{error}</span>}
                                            </div>}
                                            <Skills value={watch('skills')} onSave={e => setValue('skills', e)} placeholder="Add Skills......." info={<span>Add skills that are essential for the job</span>} label="Required Skills" />
                                            <Requirements value={watch('requirements')} onSave={e => setValue('requirements', e)} placeholder="Add Requirements......." info={<span>Add requirements for the job</span>} label="Requirements" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {active === 2 && <div className="flex p-[25px] flex-col items-start gap-[10px] self-stretch rounded-[12px] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                            <div className="flex flex-col items-start gap-[27px] self-stretch">
                                <div className="flex p-0 items-center self-stretch">
                                    <div className="flex flex-col items-start gap-4 w-full">
                                        <Input {...register("rate")} error={error ?? errors.rate?.message} prefix="₦" inputMode='numeric' type="number" placeholder="0.00" info={<span>Set the hourly rate you're willing to pay</span>} label="Slot Rate (₦)" />
                                        <div className="flex flex-col items-start gap-[16px] self-stretch">
                                            <h2 className="self-stretch text-[#0F1729] text-[17px] font-medium dark:text-neutral-300">Job Visibility</h2>
                                            <div className="flex flex-col items-start gap-[12px] w-full">
                                                <button type="button" onClick={() => setValue('visibility', 'public')} className={`flex p-[17px] flex-col items-start gap-[10px] text-left self-stretch rounded-[12px] border dark:border-neutral-500 ${watch('visibility') === 'public' ? 'bg-[rgba(37,_99,_235,_0.05)]' : ''}`}>
                                                    <div className="flex items-start gap-[12px] self-stretch">
                                                        <div className="flex w-[20px] h-[20px] justify-center items-center bg-[rgba(0,_0,_0,_0.00)]">
                                                            <LuGlobe size={20} color="#2563EB" />
                                                        </div>
                                                        <div className="flex justify-between items-center flex-1">
                                                            <div className="flex flex-col items-start gap-[4px]">
                                                                <p className="self-stretch text-[#0F1729] text-[14px] font-medium dark:text-neutral-300">Public Job</p>
                                                                <span className="self-stretch text-[#64748B] dark:text-neutral-400 text-[13px]">Your job will be visible to all candidates on the platform</span>
                                                            </div>
                                                            {watch('visibility') === 'public' && <LuCircleCheckBig size={20} color="#2563EB" />}
                                                        </div>
                                                    </div>
                                                </button>
                                                <button type="button" onClick={() => setValue('visibility', 'invite')} className={`flex p-[17px] flex-col items-start gap-[10px] text-left self-stretch rounded-[12px] border dark:border-neutral-500 ${watch('visibility') === 'invite' ? 'bg-[rgba(37,_99,_235,_0.05)]' : ''}`}>
                                                    <div className="flex items-start gap-[12px] self-stretch">
                                                        <div className="flex w-[20px] h-[20px] justify-center items-center bg-[rgba(0,_0,_0,_0.00)]">
                                                            <LuBriefcase size={20} className="text-[#64748B]" />
                                                        </div>
                                                        <div className="flex justify-between items-center flex-1">
                                                            <div className="flex flex-col items-start gap-[4px]">
                                                                <p className="self-stretch text-[#0F1729] text-[14px] font-medium dark:text-neutral-300">Invite-Only</p>
                                                                <span className="self-stretch text-[#64748B] dark:text-neutral-400 text-[13px]">Your job will only be visible to candidates you invite</span>
                                                            </div>
                                                            {watch('visibility') === 'invite' && <LuCircleCheckBig size={20} color="#2563EB" />}
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {active === 3 && <div className="w-full bg-white dark:bg-neutral-700 rounded-3xl shadow-sm p-8 border border-[#e2e8f0] dark:border-neutral-500">
                            <h1 className="text-3xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-6">Job Preview</h1>

                            {/* Public Job Notice */}
                            {watch('visibility') === 'public' && <div className="bg-[#f1f5f9] flex-col bg-neutral-600 rounded-xl p-4 mb-8 flex justify-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-4 h-4 rounded-full bg-[#22c55e] flex-shrink-0"></div>
                                    <LuGlobe className="w-5 h-5 text-[#0f1729] dark:text-neutral-300" />
                                    <span className="font-medium text-[#0f1729] dark:text-neutral-300">Public Job</span>
                                </div>
                                <p className="text-[#64748b] dark:text-neutral-400 ml-1">This job will be visible to all candidates on the platform.</p>
                            </div>}
                            {watch('visibility') === 'invite' && <div className="bg-[#f1f5f9] flex-col bg-neutral-600 rounded-xl p-4 mb-8 flex justify-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-4 h-4 rounded-full bg-[#22c55e] flex-shrink-0"></div>
                                    <LuBriefcase className="w-5 h-5 text-[#0f1729] dark:text-neutral-300" />
                                    <span className="font-medium text-[#0f1729] dark:text-neutral-300">Invite Only Job</span>
                                </div>
                                <p className="text-[#64748b] dark:text-neutral-400 ml-1">Your job will only be visible to candidates you invite</p>
                            </div>}

                            {/* Job Details Card */}
                            <div className="border border-[#e2e8f0] dark:border-neutral-500 rounded-2xl p-6">
                                {/* Job Title */}
                                <h2 className="text-2xl font-bold text-[#0f1729] dark:text-neutral-300 mb-4">{watch('title')}</h2>

                                {/* Job Meta */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <div className="bg-[#e5edff] dark:bg-neutral-600 text-[#1c4fbd] dark:text-neutral-300 px-4 py-2 rounded-full flex items-center">
                                        <span className="font-bold mr-1">₦</span>
                                        <span className="font-bold mr-1">{watch('rate')}</span>
                                        <span className="text-[#64748b] dark:text-neutral-400">/hr</span>
                                    </div>
                                    <div className="bg-[#e5edff] dark:bg-neutral-600 text-[#1c4fbd] dark:text-neutral-300 px-4 py-2 rounded-full flex items-center">
                                        <LuClock className="w-4 h-4 mr-2" />
                                        <span>{watch('time_slot')?.length} time slots</span>
                                    </div>
                                    <div className="bg-[#e5edff] dark:bg-neutral-600 text-[#1c4fbd] dark:text-neutral-300 px-4 py-2 rounded-full flex items-center">
                                        <GiLevelEndFlag className="w-4 h-4 mr-2" />
                                        <span>{watch('level')}</span>
                                    </div>
                                    <div className="bg-[#e5edff] dark:bg-neutral-600 text-[#1c4fbd] dark:text-neutral-300 px-4 py-2 rounded-full flex items-center">
                                        <LuBrainCircuit className="w-4 h-4 mr-2" />
                                        <span>{watch('experience')}</span>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-3">Job Description</h3>
                                    <div className="text-[#64748b] p-4 border h-40 overflow-y-auto border-[#e2e8f0] dark:border-neutral-500 dark:text-neutral-400 dark:border-text-neutral-500 rounded-xl">
                                        <article  dangerouslySetInnerHTML={{__html: watch('description')??''}} />
                                    </div>
                                </div>

                                {/* Job Education */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-1">Job Education</h3>
                                    <div className="text-[#64748b] overflow-y-auto dark:text-neutral-400">
                                        {watch('education')}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-3">Time Slots</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {watch('time_slot')?.map(time => <div key={time.day} className="bg-[#f1f5f9] dark:bg-neutral-600 p-4 rounded-xl flex items-center">
                                            <LuCalendar className="w-5 h-5 mr-3 text-[#64748b] dark:text-neutral-300" />
                                            <div>
                                                <span className="font-medium text-[#0f1729] dark:text-neutral-300 mr-2">{time.day}</span>
                                                <span className="text-[#64748b] dark:text-neutral-300">{time.start}-{time.end}</span>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>

                                {/* Required Skills */}
                                <div>
                                    <h3 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-3">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {watch('skills')?.map(skill => <span key={skill} className="bg-[#138f84] text-white px-4 py-2 rounded-full font-medium">{skill}</span>)}
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div className="my-2">
                                    <h3 className="text-xl font-semibold text-[#0f1729] dark:text-neutral-300 mb-3">Requirements</h3>
                                    <div className="flex flex-col gap-2">
                                        {watch('requirements')?.map(skill => <div key={skill} className="flex items-center gap-2">
                                            <LuCircleCheckBig color="#22c55e" />
                                            <span className="text-[#64748b] dark:text-neutral-400">{skill}</span>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="w-full flex justify-between items-center">
                            {active !== 0 && <Button type="button" onClick={() => setActive(pv => pv - 1)} outline>Back to {tabs[active - 1]}</Button>}
                            {active === 0 && <div></div>}
                            <Button>{active < 2 ? 'Continue to ' : ''}{tabs[active + 1]} {active === 3 && 'Post Job'}</Button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col items-start gap-[16px]">
                    <p className="self-stretch text-[#0F1729] dark:text-neutral-300 text-[18px] font-medium">Posting Tips</p>
                    <div className="flex flex-col justify-center items-center self-stretch bg-[rgba(0,_0,_0,_0.00)]">
                        <div className="flex w-full flex-col items-start gap-[15px]">
                            {tips.map(tip => <div key={tip.title} className="flex p-[17px] bg-accent dark:bg-neutral-700 flex-col items-start gap-[10px] self-stretch rounded-[12px] border dark:border-neutral-500 bg-[rgba(0,_0,_0,_0.00)]">
                                <div className="flex flex-col items-start gap-[9px] self-stretch">
                                    <div className="flex items-center gap-2">
                                        {createElement(tip.icon, {
                                            color: "#2563EB"
                                        })}
                                        <p className="flex flex-col justify-center text-[#0F1729] dark:text-neutral-300 text-[15px] font-medium">{tip.title}</p>
                                    </div>
                                    <p className="self-stretch text-[#64748B] dark:text-neutral-400 text-[13px]">{tip.description}</p>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index