import { useEffect } from "react"
import { Navigate } from "react-router"
import Sidebar from "~/components/dashboard/sidebar"
import useAuth from "~/stores/authStore"

const Index = () => {
    const { token, fetchCurrentUser } = useAuth()
    useEffect(() => {
        fetchCurrentUser()
    }, []);
    if (!token) return <Navigate to="/onboarding/signin" />
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-neutral-900 w-full overflow-hidden">
            <Sidebar activePage={'profile'} />
        </div>
    )
}

export default Index