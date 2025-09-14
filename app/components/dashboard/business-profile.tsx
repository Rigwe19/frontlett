import React from 'react'
import { FaGithub, FaLinkedin, FaShare, FaXTwitter } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'
import { LuBuilding2, LuCircleCheckBig, LuFileText, LuShare2, LuUser } from 'react-icons/lu'

type Props = {
    loaderData: {
        user: any;
        profile: any
    }
}

const BusinessProfile = ({ loaderData }: Props) => {
    return (
        <div className="w-full flex flex-col gap-4 py-4">
            <div className="flex flex-col w-[367px] items-start gap-1.5 relative">
                <div className="relative self-stretch h-[30px] mt-[-1.00px] [font-family:'General_Sans-Bold',Helvetica] font-bold text-[#0f1629] dark:text-neutral-200 text-[23.4px] tracking-[-0.60px] leading-[30px] whitespace-nowrap">
                    Company Profile
                </div>

                <p className="relative self-stretch h-6 font-normal text-[#63748a] dark:text-neutral-400 text-[16.8px] tracking-[0] leading-6 whitespace-nowrap">
                    Manage your company profile and information
                </p>
            </div>
            <div className="flex flex-col w-full items-end relative">
                <div className="relative self-stretch w-full h-48 rounded-xl overflow-hidden">
                    <div className="w-full h-48 bg-[#0000008a] relative bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${import.meta.env.VITE_BASE_SERVICE_URL}${loaderData?.profile?.cover_photo})` }}>
                        <button className="all-[unset] box-border absolute flex items-center px-2 gap-4 h-9 bottom-4 right-4 bg-[#ffffffcc] dark:bg-neutral-800 rounded-[10px] border border-solid border-[#e1e8ef] dark:border-neutral-500">
                            <FiEdit />
                            <div className="font-medium text-[#0f1629] dark:text-neutral-200 text-[13px] text-center tracking-[0] leading-5 whitespace-nowrap">
                                Edit Cover
                            </div>
                        </button>
                    </div>
                </div>

                <div className="relative w-full h-24 mt-[-39px] flex items-end">
                    <div className="relative w-24 h-24 top-0 left-2 bg-black dark:bg-neutral-700 rounded-full border-5 border-solid border-white dark:border-neutral-800">
                        <img src={`${import.meta.env.VITE_BASE_SERVICE_URL}${loaderData?.profile?.profile_picture}`} className="size-full object-cover" alt="" />
                        <div className="absolute w-8 h-8 bottom-2 -right-4 bg-white dark:bg-neutral-500 rounded-full border border-solid border-[#e1e8ef] dark:border-neutral-500 flex justify-center items-center">
                            <FiEdit />
                        </div>
                    </div>

                    <div className="w-[218px] ml-6 font-bold text-[#0f1629] dark:text-neutral-200 text-[21.5px] tracking-[0] leading-8 whitespace-nowrap">
                        {loaderData?.user?.company_name}
                    </div>
                </div>
            </div>

            <div className="w-full relative px-4 shadow-[0px_0px_0px_rgba(0,_0,_0,_0),_0px_0px_0px_rgba(0,_0,_0,_0),_0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-xl bg-white dark:bg-neutral-700 border-gray-200 dark:border-neutral-500 border-solid border-[1px] box-border text-left text-[19.22px] text-gray-500 dark:text-neutral-400">
                <div className="dark:text-neutral-400 flex justify-between items-center dark:bg-neutral-700 w-full h-[74px]">
                    <div className="dark:text-neutral-400 items-center flex gap-2 dark:bg-neutral-700 w-44 h-7 text-gray-900">
                        <LuBuilding2 size={20} className="text-primary" />
                        <b className="tracking-[-0.5px] leading-[28px] inline-block h-7">Business Details</b>
                    </div>
                    <div className="rounded-[10px] flex gap-4 px-2 dark:text-neutral-400 items-center dark:bg-neutral-700 w-[82px] h-9 text-center text-[13.1px] border border-gray-200 dark:border-neutral-500">
                        <FiEdit />
                        <div className="leading-[20px] font-medium flex items-center justify-center w-[26px] h-5">Edit</div>
                    </div>
                </div>
                <div className="dark:text-neutral-400 grid grid-cols-2 gap-2 dark:bg-neutral-700 w-full pb-2 text-[14.68px] text-gray-800">
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11">
                        <div className="leading-[20px] inline-block  h-5">Company Name</div>
                        <div className="text-[16.23px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.user?.company_name}</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.54px]">
                        <div className="leading-[20px] inline-block  h-5">Industry</div>
                        <div className="text-[16.55px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.industry}</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.46px]">
                        <div className="leading-[20px] inline-block  h-5">Company Size</div>
                        <div className="text-[18.05px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.size} employees</div>
                    </div>
                    {/* <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.98px]">
                        <div className="leading-[20px] inline-block  h-5">Year Founded</div>
                        <div className="text-[18.82px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">2010</div>
                    </div> */}
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[15.1px]">
                        <div className="leading-[20px] inline-block  h-5">Website</div>
                        <div className="text-[16.8px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.website_url}</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.53px]">
                        <div className="leading-[20px] inline-block  h-5">Address</div>
                        <div className="text-[16.26px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile.address}</div>
                    </div>
                </div>
            </div>

            <div className="w-full relative px-4 shadow-[0px_0px_0px_rgba(0,_0,_0,_0),_0px_0px_0px_rgba(0,_0,_0,_0),_0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-xl bg-white dark:bg-neutral-700 border-gray-200 dark:border-neutral-500 border-solid border-[1px] box-border text-left text-[19.22px] text-gray-500 dark:text-neutral-400">
                <div className="dark:text-neutral-400 flex justify-between items-center dark:bg-neutral-700 w-full h-[74px]">
                    <div className="dark:text-neutral-400 items-center flex gap-2 dark:bg-neutral-700 w-44 h-7 text-gray-900">
                        <LuUser size={20} className="text-primary" />
                        <b className="tracking-[-0.5px] leading-[28px] inline-block h-7">Contact Person</b>
                    </div>
                    <div className="rounded-[10px] flex gap-4 px-2 dark:text-neutral-400 items-center dark:bg-neutral-700 w-[82px] h-9 text-center text-[13.1px] border border-gray-200 dark:border-neutral-500">
                        <FiEdit />
                        <div className="leading-[20px] font-medium flex items-center justify-center w-[26px] h-5">Edit</div>
                    </div>
                </div>
                <div className="dark:text-neutral-400 grid grid-cols-2 gap-2 dark:bg-neutral-700 w-full pb-2 text-[14.68px] text-gray-800">
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11">
                        <div className="leading-[20px] inline-block  h-5">Name</div>
                        <div className="text-[16.23px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.contact_name}</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.54px]">
                        <div className="leading-[20px] inline-block  h-5">Position</div>
                        <div className="text-[16.55px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.contact_role}</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.46px]">
                        <div className="leading-[20px] inline-block  h-5">Email</div>
                        <div className="text-[18.05px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.contact_email}</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.98px]">
                        <div className="leading-[20px] inline-block  h-5">Phone</div>
                        <div className="text-[18.82px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">{loaderData?.profile?.contact_phone_number}</div>
                    </div>
                </div>
            </div>

            <div className="w-full relative px-4 shadow-[0px_0px_0px_rgba(0,_0,_0,_0),_0px_0px_0px_rgba(0,_0,_0,_0),_0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-xl bg-white dark:bg-neutral-700 border-gray-200 dark:border-neutral-500 border-solid border-[1px] box-border text-left text-[19.22px] text-gray-500 dark:text-neutral-400">
                <div className="dark:text-neutral-400 flex justify-between items-center dark:bg-neutral-700 w-full h-[74px]">
                    <div className="dark:text-neutral-400 items-center flex gap-2 dark:bg-neutral-700 h-7 text-gray-900">
                        <LuFileText size={20} className="text-primary" />
                        <b className="tracking-[-0.5px] leading-[28px] inline-block h-7">Compliance & Trust</b>
                    </div>
                    <div className="rounded-[10px] flex gap-4 px-2 dark:text-neutral-400 items-center dark:bg-neutral-700 w-[82px] h-9 text-center text-[13.1px] border border-gray-200 dark:border-neutral-500">
                        <FiEdit />
                        <div className="leading-[20px] font-medium flex items-center justify-center w-[26px] h-5">Edit</div>
                    </div>
                </div>
                <div className="dark:text-neutral-400 grid grid-cols-2 gap-2 dark:bg-neutral-700 w-full pb-2 text-[14.68px] text-gray-800">
                    {/* <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11">
                        <div className="leading-[20px] inline-block  h-5">Tax ID</div>
                        <div className="text-[16.23px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">XX-XXXXXXX</div>
                    </div> */}
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.54px]">
                        <div className="leading-[20px] inline-block  h-5">Registration Number</div>
                        <div className="text-[16.55px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 inline-block  h-6">6736373</div>
                    </div>
                    <div className="dark:text-neutral-400 flex flex-col dark:bg-neutral-700  h-11 text-[14.46px]">
                        <div className="leading-[20px] inline-block  h-5">Compliance Status</div>
                        <div className="text-[18.05px] leading-[24px] font-medium text-gray-500 dark:text-neutral-400 flex items-center gap-2 h-6">
                            <LuCircleCheckBig color="#16A34A" />
                            Verified
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full relative px-4 shadow-[0px_0px_0px_rgba(0,_0,_0,_0),_0px_0px_0px_rgba(0,_0,_0,_0),_0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-xl bg-white dark:bg-neutral-700 border-gray-200 dark:border-neutral-500 border-solid border-[1px] box-border text-left text-[19.22px] text-gray-500 dark:text-neutral-400">
                <div className="dark:text-neutral-400 flex justify-between items-center dark:bg-neutral-700 w-full h-[74px]">
                    <div className="dark:text-neutral-400 items-center flex gap-2 dark:bg-neutral-700 h-7 text-gray-900">
                        <LuCircleCheckBig size={20} className="text-primary" />
                        <b className="tracking-[-0.5px] leading-[28px] inline-block h-7">Readiness Status</b>
                    </div>
                    <div className="rounded-[10px] flex gap-4 px-2 dark:text-neutral-400 items-center dark:bg-neutral-700 w-[82px] h-9 text-center text-[13.1px] border border-gray-200 dark:border-neutral-500">
                        <FiEdit />
                        <div className="leading-[20px] font-medium flex items-center justify-center w-[26px] h-5">Edit</div>
                    </div>
                </div>
                <div className="w-full relative bg-gray mb-4 h-7 text-left text-[14.76px] flex items-center gap-2 font-general-sans">
                    <div className="rounded-[9999px] bg-[#F0FDF4] w-[98px] h-7 flex items-center justify-center">
                        <div className="leading-[20px] font-medium inline-block w-[78px] h-5 text-[#16A34A]">Completed</div>
                    </div>
                    <div className="text-[13.15px] leading-[20px] text-gray-500 dark:text-neutral-400 dark:text-neutral-400 inline-block w-[427px] h-5">Your company has completed all required readiness assessments</div>
                </div>
            </div>

            <div className="w-full relative px-4 shadow-[0px_0px_0px_rgba(0,_0,_0,_0),_0px_0px_0px_rgba(0,_0,_0,_0),_0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-xl bg-white dark:bg-neutral-700 border-gray-200 dark:border-neutral-500 border-solid border-[1px] box-border text-left text-[19.22px] text-gray-500 dark:text-neutral-400">
                <div className="dark:text-neutral-400 flex justify-between items-center dark:bg-neutral-700 w-full h-[74px]">
                    <div className="dark:text-neutral-400 items-center flex gap-2 dark:bg-neutral-700 h-7 text-gray-900">
                        <LuShare2 size={20} className="text-primary" />
                        <b className="tracking-[-0.5px] leading-[28px] inline-block h-7">Social Media Links</b>
                    </div>
                    <div className="rounded-[10px] flex gap-4 px-2 dark:text-neutral-400 items-center dark:bg-neutral-700 w-[82px] h-9 text-center text-[13.1px] border border-gray-200 dark:border-neutral-500">
                        <FiEdit />
                        <div className="leading-[20px] font-medium flex items-center justify-center w-[26px] h-5">Edit</div>
                    </div>
                </div>
                <div className="dark:text-neutral-400 grid grid-cols-1 gap-2 dark:bg-neutral-700 w-full pb-2 text-[14.68px] text-gray-800">
                    <div className="w-full relative flex flex-row items-center gap-1 text-left text-[13.34px] text-Black-Text font-general-sans">
                        <FaLinkedin className="size-6 relative max-h-full overflow-hidden shrink-0" />
                        <div className="w-[227px] relative leading-[20px] flex items-center h-7 shrink-0">{loaderData?.profile?.linkedIn}</div>
                    </div>
                    {loaderData?.profile?.github && <div className="w-full relative flex flex-row items-center gap-1 text-left text-[13.34px] text-Black-Text font-general-sans">
                        <FaGithub className="size-6 relative max-h-full overflow-hidden shrink-0" />
                        <div className="w-[227px] relative leading-[20px] flex items-center h-7 shrink-0">{loaderData?.profile?.github}</div>
                    </div>}
                    {loaderData?.profile?.twitter && <div className="w-full relative flex flex-row items-center gap-1 text-left text-[13.34px] text-Black-Text font-general-sans">
                        <FaXTwitter className="size-6 relative max-h-full overflow-hidden shrink-0" />
                        <div className="w-[227px] relative leading-[20px] flex items-center h-7 shrink-0">{loaderData?.profile?.twitter}</div>
                    </div>}
                    {loaderData?.profile?.other && <div className="w-full relative flex flex-row items-center gap-1 text-left text-[13.34px] text-Black-Text font-general-sans">
                        <FaShare className="size-6 relative max-h-full overflow-hidden shrink-0" />
                        <div className="w-[227px] relative leading-[20px] flex items-center h-7 shrink-0">{loaderData?.profile?.other}</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default BusinessProfile