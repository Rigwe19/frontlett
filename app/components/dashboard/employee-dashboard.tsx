import React, { useEffect, useState } from 'react'
import Input from './input'
import { LuFilter, LuMapPin, LuSearch } from 'react-icons/lu'
import { PiEmptyDuotone } from "react-icons/pi";
import Button from '../ui/button'
import Select from './select'
import { get } from '~/libs/axios';
import { useNavigate } from 'react-router';
import JobCard from './job-card';

type Props = {}
type Job = {
    id: number;
    title: string;
    created_at: string;
    time_slot: string[]
}

const EmployeeDashboard = (loaderData:{ jobs?: Job[]; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobs, setJobs] = useState<any[]>(loaderData?.jobs ?? [])
    const navigate = useNavigate();
    // useEffect(() => {
    //     getQuery()
    // }, []);
    // const getQuery = async () => {
    //     await get<{ success: boolean, jobs: any[] }>('jobs')
    //         .then(res => {
    //             const { success, jobs } = res.data;
    //             if (success) {
    //                 setJobs(jobs);
    //             }
    //         })
    // }
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full md:pl-4 p-3 flex-col justify-center items-start gap-[11px] flex-shrink-0 rounded-[12px] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex flex-col md:flex-row w-full md:items-center gap-[11px]">
                    <div className="flex flex-col md:flex-row items-center gap-1.5 justify-between md:w-5/7">
                        <Input placeholder="Search for opportunities" icon={LuSearch} className="grow" />
                        <Input placeholder="Location" icon={LuMapPin} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            outline
                            className="dark:border-neutral-500 h-12 text-black dark:text-neutral-200"
                        >
                            <LuFilter />
                            Filter
                        </Button>
                        <Button className="h-12">Search</Button>
                    </div>
                </div>
                <div className="flex md:items-end gap-[21px] flex-col md:flex-row w-full">
                    <div className="flex md:items-center gap-3 flex-col md:flex-row">
                        <Select placeholder='Any job role' className="" />
                        <Select placeholder='Any time slot' />
                    </div>
                    <div className="flex justify-center items-center gap-[22px]">
                        <div className="flex items-center gap-1 text-sm text-[#6B7280] dark:text-neutral-300">
                            <span className="">₦</span>
                            <Input className="w-20" placeholder="Min" />
                            <span className="">-</span>
                            <Input className="w-20" placeholder="Max" />
                            <div className="flex">
                                /<span>hr</span>
                            </div>

                        </div>
                        <div className="flex w-[118px] h-[37px] p-[5px] justify-center items-center gap-1 rounded-full dark:bg-neutral-500 bg-[#F3F4F6]">
                            <input type="checkbox" className="w-[18px] h-[18px] dark:bg-neutral-700 bg-amber-200" name="" id="" />
                            <span className="text-[#1F2937] dark:text-neutral-300 text-[14px]">Urgent only</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:aspect-video flex-col aspect-[9_/_16] flex rounded-2xl">
                {jobs.length === 0 && <div className="w-full h-full flex items-center justify-center">
                    <PiEmptyDuotone size={64} className="text-[#6B7280] dark:text-neutral-300" />
                    <p className="text-sm text-[#6B7280] dark:text-neutral-300">You haven't applied for any job yet</p>
                </div>}
                {jobs.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {jobs.map(job=><JobCard key={job.id} job={job} />)}
                </div>}
            </div>
        </div>
    )
}

export default EmployeeDashboard