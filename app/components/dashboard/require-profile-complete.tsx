import { useEffect, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import useAuth from '~/stores/authStore'

type Props = {}

const RequireProfileComplete = ({ children }: PropsWithChildren) => {
  const { token, user, fetchCurrentUser } = useAuth()
  useEffect(() => {
    fetchCurrentUser()
  }, []);
  const currentPath = location.pathname;
  console.log(!user?.profile?.is_completed && user?.role !== 'business')
  const incomplete = !user?.profile?.is_completed && user?.role !== 'business'
  const isOnCompleteProfilePage = currentPath.includes('complete-profile');
  if (!token) return <Navigate to="/onboarding/signin" />
  if (incomplete && !isOnCompleteProfilePage) return <Navigate to="/dashboard/complete-profile/core-information" replace />

  return (
    <div>{children}</div>
  )
}

export default RequireProfileComplete