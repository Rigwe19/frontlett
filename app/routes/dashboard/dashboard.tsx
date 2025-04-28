import BusinessDashboard from "~/components/dashboard/business-dashboard";
import EmployeeDashboard from "~/components/dashboard/employee-dashboard";
import useAuth from "~/stores/authStore";
import type { Route } from "./+types/dashboard";
import { get } from "~/libs/axios";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Dashboard" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const res = await get<{ success: boolean, jobs: { id: number; title: string; created_at: string; time_slot: string[] }[]; applicants: number }>('jobs')

        const { success, jobs, applicants } = res.data;
        if (success) {
            return {
                jobs,
                dashboard: [jobs.length, applicants, 0, 0]
            }
            // setJobs(jobs);
            // setDashboard([jobs.length, applicants, 0, 0])
        }
    } catch (error) {
        console.log(error)
    }

}
const Dashboard = ({ loaderData }: Route.ComponentProps) => {
    const { user } = useAuth();
    if (user?.role === 'business') return <BusinessDashboard jobs={loaderData?.jobs} dashboard={loaderData?.dashboard} />
    return <EmployeeDashboard jobs={loaderData?.jobs} />
}

export default Dashboard