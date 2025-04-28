import { Navigate, useLocation } from "react-router"
import Sidebar from "~/components/dashboard/sidebar"
import useAuth, { getAuthState } from "~/stores/authStore"
import { useEffect, useState } from "react"
import type { Route } from "./+types"
import RequireProfileComplete from "~/components/dashboard/require-profile-complete"

// export async function clientLoader({ params }: Route.ClientLoaderArgs) {
//     const authState = getAuthState();
//     await authState.fetchCurrentUser()
//     let result = true
//     const user = authState.user
//     console.log(result, user?.role)
//     if (user?.role === 'business') {
//         result = false
//         console.log('role')
//     }
//     if (location.pathname.includes('complete-profile')) {
//         result = false
//         console.log('profile', location.pathname)
//     }
//     if (user?.profile?.is_completed) {
//         result = false
//         console.log('completed')
//     }
//     return {
//         result
//     }
// }
const Index = ({ loaderData }: Route.ComponentProps) => {
    // const {result} = loaderData;
    // const { token, user } = useAuth()
    // console.log(result)
    // // const location = useLocation()
    // if (!token) return <Navigate to="/onboarding/signin" />
    // if(result) return <Navigate to="/dashboard/complete-profile/core-information" />
    return (
        <RequireProfileComplete>
            <div className="flex h-screen bg-gray-50 dark:bg-neutral-800 w-full overflow-hidden">
                <Sidebar activePage={'profile'} />
            </div>
        </RequireProfileComplete>
    )
}

export default Index