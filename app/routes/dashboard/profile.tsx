import React from 'react'
import { LuArrowRight, LuBriefcase, LuCircleCheckBig, LuGraduationCap, LuMapPin, LuPencilLine, LuStar, LuUser } from 'react-icons/lu';
import Button from '~/components/ui/button';
import useAuth from '~/stores/authStore';

type Props = {}

const Profile = (props: Props) => {
    const { user } = useAuth() 
    const width = '10%';
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex gap-2">
                <div className="flex-1 h-3 md:h-4.5 flex items-center">
                    <div className="h-full bg-[#FF8500] rounded-full h-2 md:h-3.5" style={{ width }}></div>
                </div>
                <p className="text-[#0F1729] dark:text-neutral-300 font-medium leading-6">10% Complete</p>
            </div>
            <div className="w-full rounded-lg py-3 px-6 bg-white dark:bg-neutral-700 flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex gap-8">
                        <div className="w-[92px] h-[92px] rounded-full relative">
                            <svg width="90" height="93" viewBox="0 0 90 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5589_873)">
                                    <rect x="0.144531" y="0.290039" width="89.4206" height="92" rx="44.7103" fill="#F0F0F0" />
                                    <path d="M91.3693 97.4152C91.3693 122.646 70.9156 143.1 45.6847 143.1C20.4537 143.1 0 122.646 0 97.4152C0 72.1842 20.4537 51.7305 45.6847 51.7305C70.9156 51.7305 91.3693 72.1842 91.3693 97.4152Z" fill="#D9D9D9" />
                                    <path d="M58.1369 29.5227C58.1369 37.8454 52.897 44.5923 44.5743 44.5923C36.2516 44.5923 31.0909 37.8454 31.0909 29.5227C31.0909 21.2 36.2516 14.4531 44.5743 14.4531C52.897 14.4531 58.1369 21.2 58.1369 29.5227Z" fill="#D9D9D9" />
                                    <path d="M63.826 19.4681L45.7674 14.3181C45.7127 14.3025 45.6556 14.2968 45.5989 14.3013L41.82 14.6036C41.7534 14.609 41.6887 14.6282 41.63 14.6602L41.6124 14.6698C41.1796 14.9059 41.3473 15.5635 41.8403 15.5635H43.1717C43.2077 15.5635 43.2437 15.5676 43.2787 15.5757L46.3192 16.2773L49.7573 17.2705C49.8429 17.2953 49.9198 17.3435 49.9794 17.4099L52.5224 20.2436C52.6127 20.3442 52.7415 20.4016 52.8766 20.4016H63.6955C64.2474 20.4016 64.3568 19.6195 63.826 19.4681Z" fill="#D9D9D9" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5589_873">
                                        <rect x="0.144531" y="0.290039" width="89.4206" height="92" rx="44.7103" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className="absolute w-6 h-6 rounded-full flex justify-center items-center bottom-2 right-0 bg-white dark:bg-neutral-500">
                                <LuPencilLine />
                            </div>
                        </div>
                        <section className=" flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-[#020817] dark:text-neutral-300 text-2xl font-semibold">{user?.full_name}</h2>
                                <p className="leading-6 text-[#64748B] dark:text-neutral-400">No Professional Headline</p>
                                <p className="text-sm leading-6 text-[#64748B] dark:text-neutral-400 inline-flex items-center gap-1">
                                    <LuMapPin className="text-[#64748B] dark:text-neutral-400" />
                                    No location</p>
                            </div>

                            <Button className="">Edit</Button>
                        </section>
                    </div>
                    <button className="flex h-fit py-2.5 px-4 justify-center items-center gap-2.5 rounded-md border dark:border-neutral-500 border-[#E2E8F0]">Edit</button>
                </div>
                <div className="flex gap-4">
                    <div className="flex w-1/3 md:max-w-[236px] gap-1 flex-col p-3 rounded-md bg-[#F9F9F9] dark:bg-neutral-600">
                        <div className="flex items-center gap-3">
                            <p className="text-primary text-lg leading-7">0</p>
                            <p className="text-xs leading-5  dark:text-neutral-400">/hr</p>
                        </div>
                        <p className="text-sm leading-5 text-[#6B7280] dark:text-neutral-400">Hourly Rate</p>
                    </div>
                    <div className="flex w-1/3 md:max-w-[236px] gap-1 flex-col p-3 rounded-md bg-[#F9F9F9] dark:bg-neutral-600">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1 items-center">
                                <LuStar color="#EAB308" />
                                <p className="text-lg leading-7">0</p>
                            </div>

                            <p className="text-xs leading-5  dark:text-neutral-400">/5</p>
                        </div>
                        <p className="text-sm leading-5 text-[#6B7280] dark:text-neutral-400">Rating</p>
                    </div>
                    <div className="flex w-1/3 md:max-w-[236px] gap-1 flex-col p-3 rounded-md bg-[#F9F9F9] dark:bg-neutral-600">
                        <div className="flex gap-1 items-center">
                            <LuCircleCheckBig color="#0D6EFD" />
                            <p className="text-lg leading-7">0</p>
                        </div>
                        <p className="text-sm leading-5 text-[#6B7280] dark:text-neutral-400">job Success</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex p-[25px] items-start justify-between border-[#E2E8F0] gap-6 rounded-lg border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex gap-1 flex-col">
                    <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Your Availability</p>
                    <p className="self-stretch text-[#64748B] dark:text-neutral-300 text-sm">Set up your availability to let employers hire you</p>
                </div>
                <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Update My Availability</button>
            </div>
            <div className="w-full flex p-[25px] items-start justify-between gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">About</p>
                <button className="flex items-center gap-1 text-primary">
                    Add About
                    <LuArrowRight size={24} />
                </button>
            </div>
            <div className="w-full flex p-[25px] items-start justify-between gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Skill & Expertise</p>
                <button className="flex items-center gap-1 text-primary">
                    Add Skills
                    <LuArrowRight size={24} />
                </button>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuUser size={20} />
                        <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Portfolio</p>
                    </div>
                    <button className="flex items-center gap-1 text-primary">
                        Manage Portfolio
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuUser size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">No Portfolio Items yet</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Portfolio</button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuBriefcase size={20} />
                        <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Work Experience</p>
                    </div>
                    <button className="flex items-center gap-1 text-primary">
                        Add Experience
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuBriefcase size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">No work experience added yet</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Work Experience</button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuBriefcase size={20} />
                        <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Current Work</p>
                    </div>
                    <button className="flex items-center gap-1 text-primary">
                        Apply for slots
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuBriefcase size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">You have not received any role yet</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Apply for slots</button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuGraduationCap size={20} />
                        <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Education</p>
                    </div>

                    <button className="flex items-center gap-1 text-primary">
                        Add Education
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuGraduationCap size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">You’ve not added any educational qualifications</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Education</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile