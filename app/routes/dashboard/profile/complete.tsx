import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import useAuth, { getAuthState } from "~/stores/authStore";
import type { Route } from "./+types/complete";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Complete Profile" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}

const steps = [
    'Step 1: Information',
    'Step 2: Availability',
    'Step 3: Professional Details',
    // 'Step 4: Documents',
    'Step 4: Portfolio',
    'Step 5: Readiness Checklist'
]
const Complete = ({ loaderData }: Route.ComponentProps) => {
    const { user, step } = useAuth();
    const page = (step > (user?.profile?.steps ?? 0) ? step : user?.profile?.steps) ?? 1
    let result = '';
    switch (page) {
        case 1:
            result = '/dashboard/complete-profile/core-information'
            break;
        case 2:
            result = '/dashboard/complete-profile/availability'
            break;
        case 3:
            result = '/dashboard/complete-profile/details'
            break;
        case 4:
            result = '/dashboard/complete-profile/portfolio'
            break;
        case 5:
            result = '/dashboard/complete-profile/readiness-checklist'
            break;
        // case 6:
        //     result = '/complete-profile/'
        //     break;
        default:
            result = '/dashboard/complete-profile/core-information'
            break;
    }
    if(user?.profile?.is_completed || user?.role === 'business') {
        result = '/dashboard';
    }
    if (location.pathname !== result) return <Navigate to={result} />
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex gap-2">
                <div className="flex-1 h-3 md:h-4.5 flex items-center">
                    <div className="h-full bg-[#FF8500] rounded-full h-2 md:h-3.5" style={{ width: (user?.percentage_completed ?? 0) + '%' }}></div>
                </div>
                <p className="text-[#0F1729] dark:text-neutral-300 font-medium leading-6">{user?.percentage_completed}% Complete</p>
            </div>
            <div className="w-full gap-8 flex flex-col">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl dark:text-neutral-300 text-[#0F1729]">Complete your profile</h3>
                    <p className="text-[#64748B] dark:text-neutral-400">Set up your profile to start matching with opportunities.</p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row md:gap-4">
                        {steps.map((item, index) => <div key={item} className={`py-2.5 px-1 ${index <= (page) - 1 ? 'border-b-2 text-primary border-b-primary font-bold' : 'border-b text-[#64748B] dark:text-neutral-400'}`}>
                            {item}
                        </div>)}
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Complete