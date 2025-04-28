import { formatDistance } from "date-fns";
import { LuBriefcase, LuCircleCheckBig, LuClock, LuMapPin } from "react-icons/lu";
import Button from "../ui/button";

type Props = {
    job: {
        user: {
            company_name: string;
            company_location: string;
        }
        title: string
        created_at: string
        rate: number;
        skills: string[];
        time_slot: {
            day: string;
            start: string;
            end: string;
        }[];
        id: number;
        has_applied: boolean
    }

}
export default function JobCard({ job: { user, title, created_at, rate, skills, time_slot, id, has_applied } }: Props) {
    return (
        <div className="rounded-2xl border justify-between border-[#e2e8f0] bg-white flex flex-col dark:border-neutral-500 dark:bg-neutral-700 overflow-hidden w-full">
            <div className="p-6 space-y-6">
                {/* Company Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#4f46e5] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            {user.company_name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-[#0f1729] dark:text-neutral-300 text-xl font-bold">{user.company_name}</h2>
                            <p className="text-[#64748b] dark:text-neutral-400 text-sm">Posted {formatDistance(new Date(created_at), new Date(), { addSuffix: true })}</p>
                        </div>
                    </div>
                    {/* <div className="bg-[#f5f7ff] text-[#1c4fbd] px-4 py-2 rounded-full text-sm font-medium">
                            Actively Hiring
                        </div> */}
                </div>

                {/* Job Title */}
                <h1 className="text-3xl font-bold text-[#0f1729] dark:text-neutral-300">{title}</h1>

                {/* Job Details */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-[#64748b] dark:text-neutral-400">
                        <LuMapPin size={18} className="text-[#64748b] dark:text-neutral-400" />
                        <span>{user.company_location}</span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-[#64748b] dark:text-neutral-400">
                            <LuBriefcase size={18} className="text-[#64748b] dark:text-neutral-400" />
                            <span>0 - 1 years</span>
                        </div> */}
                </div>

                {/* Time Slots */}
                <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar]:w-2">
                    {time_slot.map(slot => <div key={`${slot.day}_${slot.start}`} className="bg-[#f1f5f9] dark:bg-neutral-600 text-[#0f1729] dark:text-neutral-300 px-4 py-2 rounded-full flex items-center gap-2">
                        <LuClock size={18} className="text-[#64748b] dark:text-neutral-400" />
                        <span>{slot.day} {slot.start}-{slot.end}</span>
                    </div>)}
                </div>

                {/* Salary */}
                <div>
                    <span className="text-[#64748b] dark:text-neutral-400">₦</span>{" "}
                    <span className="text-3xl font-bold text-[#0f1729] dark:text-neutral-300">{rate}</span>{" "}
                    <span className="text-[#64748b] dark:text-neutral-400">/hr</span>
                </div>

                {/* Required Skills */}
                <div>
                    <h3 className="text-xl font-bold text-[#0f1729] dark:text-neutral-300 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => <div key={skill} className="flex items-center gap-1">
                            <LuCircleCheckBig size={16} className="text-[#22c55e]" />
                            <span>{skill}</span>
                        </div>)}
                    </div>
                </div>
            </div>

            {/* Apply Button */}
            <div className="border dark:border-neutral-500 p-4 w-full">
                <Button to={`/dashboard/job/apply/${id}`} className="w-full" disabled={has_applied}>
                    {!has_applied ? 'Quick Apply' : 'Applied'}
                </Button>
            </div>
        </div>
    )
}
