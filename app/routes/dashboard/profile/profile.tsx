import { LuArrowRight, LuBriefcase, LuBuilding, LuCalendar, LuCircleCheckBig, LuGraduationCap, LuMapPin, LuPencilLine, LuStar, LuUser } from 'react-icons/lu';
import Button from '~/components/ui/button';
import useAuth from '~/stores/authStore';
import type { Route } from './+types/profile';
import { get } from '~/libs/axios';
import BusinessProfile from '~/components/dashboard/business-profile';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Profile" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await get<{
        success: boolean,
        user: any,
        profile: {
            availability: {
                [key: string]: string[]
            }
            professional_headline: string;
            about: string;
            skills: string[];
            profile_picture: string;
            dp: string | undefined;
        },
        portfolio: {
            title: string;
            description: string;
            path: string;
        }[],
        education: {
            degree: string;
            institution: string;
            started_at: string;
            ended_at: string;
        }[],
        experiences: {
            title: string;
            company: string;
            started_at: string;
            ended_at: string;
            is_present: string;
        }[],
        percentage_completed: number
    }>('profile')

    const { success, user, profile, portfolio, education, experiences, percentage_completed } = res.data;
    if (success) {
        if (profile?.profile_picture) {
            profile.dp = import.meta.env.VITE_BASE_SERVICE_URL + profile?.profile_picture;
        }
        console.log(profile)
        return {
            user,
            profile,
            portfolio,
            education,
            experiences,
            percentage_completed
        }
        // setJobs(jobs);
        // setDashboard([jobs.length, applicants, 0, 0])
    }
}

const Profile = ({ loaderData }: Route.ComponentProps) => {
    // const { user } = useAuth() 
    if(loaderData?.user?.role === 'business') return <BusinessProfile loaderData={loaderData} />
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex gap-2">
                <div className="flex-1 h-3 md:h-4.5 flex items-center">
                    <div className="h-full bg-[#FF8500] rounded-full h-2 md:h-3.5" style={{ width: `${loaderData?.percentage_completed}%` }}></div>
                </div>
                <p className="text-[#0F1729] dark:text-neutral-300 font-medium leading-6">{loaderData?.percentage_completed}% Complete</p>
            </div>
            <div className="w-full rounded-lg py-3 px-6 bg-white dark:bg-neutral-700 flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex gap-8">
                        <div className="w-[92px] h-[92px] rounded-full relative">
                            <img src={loaderData?.profile?.dp ?? "/images/avatar.png"} alt="" className="size-[92px] rounded-full border-2 border-[#0D6EFD]" />
                            <div className="absolute z-0 w-6 h-6 rounded-full flex justify-center items-center bottom-2 right-0 bg-white dark:bg-neutral-500">
                                <LuPencilLine color="#0D6EFD" strokeWidth={2} />
                            </div>
                        </div>
                        <section className=" flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-[#020817] dark:text-neutral-300 text-2xl font-semibold">{loaderData?.user?.full_name}</h2>
                                <p className="leading-6 text-[#64748B] dark:text-neutral-400">{loaderData?.profile?.professional_headline ?? 'No Professional Headline'}</p>
                                <p className="text-sm leading-6 text-[#64748B] dark:text-neutral-400 inline-flex items-center gap-1">
                                    <LuMapPin className="text-[#64748B] dark:text-neutral-400" />
                                    No location</p>
                            </div>

                            <Button className="py-1">Edit</Button>
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
            <section className="border rounded-lg p-6 shadow-sm rounded-lg border-[#E2E8F0] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="w-full flex p-[25px] items-start justify-between gap-6">
                    <div className="flex gap-1 flex-col">
                        <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Your Availability</p>
                        {!loaderData?.profile?.availability && <p className="self-stretch text-[#64748B] dark:text-neutral-300 text-sm">Set up your availability to let employers hire you</p>}
                        {loaderData?.profile?.availability && <p className="self-stretch text-[#64748B] dark:text-neutral-300 text-sm">You're available for 20 hours this week</p>}
                    </div>
                    <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Update My Availability</button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {Object.entries(loaderData?.profile?.availability ?? {})?.map((entry) => (
                        <div key={entry[0]} className="flex flex-col gap-2">
                            <div key={entry[0]} className="font-medium text-[#374151] dark:text-neutral-300">
                                {entry[0]}
                            </div>
                            {entry[1].map(value => (
                                <div key={`${value}-morning`} className="bg-[#dcf6fc] dark:bg-neutral-500 rounded p-2 text-xs text-[#1f2937] dark:text-neutral-200">
                                    {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
            <section className="border rounded-lg p-6 space-y-6 shadow-sm rounded-lg border-[#E2E8F0] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="w-full flex items-start justify-between gap-6">
                    <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">About</p>
                    <button className="flex items-center gap-1 text-primary">
                        {loaderData?.profile?.about ? 'Edit' : 'Add'} About
                        <LuArrowRight size={24} />
                    </button>
                </div>
                <p className="text-[#64748b] dark:text-neutral-300 mb-3">
                    {loaderData?.profile?.about}
                </p>
            </section>
            <section className="border rounded-lg p-6 space-y-6 shadow-sm rounded-lg border-[#E2E8F0] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="w-full flex items-start justify-between gap-6">
                    <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Skill & Expertise</p>
                    <button className="flex items-center gap-1 text-primary">
                        Add Skills
                        <LuArrowRight size={24} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {loaderData?.profile?.skills?.map((skill: string) => (
                        <div
                            key={skill}
                            className="bg-[#f2f7ff] px-3 rounded-full text-[#3b82f6] dark:text-neutral-200 text-sm dark:bg-neutral-600 border border-[#e2e8f0] dark:border-neutral-500 flex items-center"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </section>
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
                {loaderData?.portfolio.length === 0 && <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuUser size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">No Portfolio Items yet</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Portfolio</button>
                    </div>
                </div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loaderData?.portfolio?.map(value=><PortfolioCard
                    key={value.path}
                        title={value.title}
                        description={value.description}
                        imageUrl={`${import.meta.env.VITE_BASE_SERVICE_URL}${value.path}`}
                    />)}
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
                {loaderData?.experiences?.length === 0 && <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuBriefcase size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">No work experience added yet</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Work Experience</button>
                    </div>
                </div>}

                <div className="space-y-6">
                    {loaderData?.experiences?.map((exp, index) => <ExperienceCard
                        key={`${exp.title}_${index}`}
                        title={exp.title}
                        company={exp.company}
                        period={`${(exp.started_at)} - ${exp.ended_at}`}
                    // description={exp.description}
                    />)}
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
                {loaderData?.education?.length === 0 && <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuGraduationCap size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">You’ve not added any educational qualifications</p>
                        </div>
                        <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Education</button>
                    </div>
                </div>}

                <div className="space-y-6">
                    {loaderData?.education?.map((exp, index) => <EducationCard
                        key={`${exp.degree}_${index}`}
                        title={exp.degree}
                        institution={exp.institution}
                        period={`${(exp.started_at)} - ${exp.ended_at}`}
                    // description={exp.description}
                    />)}
                </div>
            </div>
        </div>
    )
}
interface Experience {
    description?: string;
    title: string;
    company: string;
    period: string;
    status?: string
}
function ExperienceCard({ title, company, period, description }: Readonly<Experience>) {
    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[#0f1729] dark:text-neutral-200">{title}</h3>
                <div className="flex items-center text-sm text-[#64748b] dark:text-neutral-400">
                    <LuCalendar className="h-4 w-4 mr-1" />
                    <span>{period}</span>
                </div>
            </div>
            <div className="text-sm text-[#64748b] dark:text-neutral-400 mb-2">
                <LuBuilding className="h-3 w-3 inline mr-1" />
                {company}
            </div>
            <p className="text-sm text-[#64748b] dark:text-neutral-400">{description}</p>
        </div>
    )
}


function CurrentWorkCard({ title, company, period, description, status }: Readonly<Experience>) {
    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[#0f1729]">{title}</h3>
                {status === "In Progress" ? (
                    <div className="bg-[#f2f7ff] px-2.5 rounded-full text-[#3b82f6] hover:bg-[#e2e8f0] border border-[#e2e8f0]">
                        In Progress</div>
                ) : (
                    <span className="text-sm text-[#64748b]">Completed</span>
                )}
            </div>
            <div className="flex items-center text-sm text-[#64748b] mb-1">
                <LuBuilding className="h-3 w-3 mr-1" />
                {company}
            </div>
            <div className="flex items-center text-sm text-[#64748b] mb-2">
                <LuCalendar className="h-3 w-3 mr-1" />
                <span>{period}</span>
            </div>
            <p className="text-sm text-[#64748b]">{description}</p>
        </div>
    )
}
type Education = {
    title: string;
    institution: string;
    period: string
}
function EducationCard({ title, institution, period }: Readonly<Education>) {
    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[#0f1729] dark:text-neutral-200">{title}</h3>
                <div className="flex items-center text-sm text-[#64748b] dark:text-neutral-400">
                    <LuCalendar className="h-4 w-4 mr-1" />
                    <span>{period}</span>
                </div>
            </div>
            <div className="text-sm text-[#64748b] dark:text-neutral-400">{institution}</div>
        </div>
    )
}
type Portfolio = {
    title: string;
    description: string;
    imageUrl: string
}
function PortfolioCard({ title, description, imageUrl }: Readonly<Portfolio>) {
    return (
        <div className="border dark:border-neutral-500 rounded-lg overflow-hidden">
            <div className="relative h-40">
                <img src={imageUrl || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-medium text-[#0f1729]">{title}</h3>
                    <span className="h-4 w-4 text-[#3b82f6]" />
                </div>
                <p className="text-sm text-[#64748b]">{description}</p>
            </div>
        </div>
    )
}
export default Profile