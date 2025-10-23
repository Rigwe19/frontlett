import { useEffect, useState, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { get } from '~/libs/axios'
import useAuth from '~/stores/authStore'

type Props = {}

const RequireProfileComplete = ({ children }: PropsWithChildren) => {
  const { token, user, updateStep, fetchCurrentUser, updateNumber } = useAuth()
  const [isComplete, setIsComplete] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [isCompleteBusiness, setIsCompleteBusiness] = useState(false);
  const [isVerified, setIsVerified] = useState(!!user?.phone_verified_at);
  const currentPath = location.pathname;
  useEffect(() => {
    fetchCurrentUser()

    const getProfile = async () => {
      const res = await get<{ success: boolean,  profile: { steps: number; } }>('profile')
      console.log("It git here")
      const { success, profile: { steps } } = res.data;
      if(success) {
        updateStep(steps)
      }
      getProfile();
    }
  }, []);
  useEffect(() => {
    const incomplete = !user?.profile?.is_completed && user?.role !== 'business'
    const incompleteBusiness = !user?.profile?.is_completed && user?.role === 'business'
    const isOnCompleteProfilePage = currentPath.includes('complete-profile');
    const subscribe = !!user?.subscription;
    const isOnPricing = currentPath.includes('pricing')
    // setIsVerified(!!user?.phone_verified_at);
    // console.log(!!user?.phone_verified_at)
    if (!isVerified) {
      updateNumber(user?.phone_number ?? '');
    }
    setIsComplete(incomplete && !isOnCompleteProfilePage)
    setIsSubscribe(!subscribe && !isOnPricing)
    setIsCompleteBusiness(incompleteBusiness && !isOnCompleteProfilePage)
  }, [user, currentPath]);

  if (!token) return <Navigate to="/onboarding/signin" />
  if (!isVerified) return <Navigate to="/onboarding/verify" replace />
  // if (isSubscribe) return <Navigate to="/dashboard/pricing" replace />
  if (isComplete) return <Navigate to="/dashboard/complete-profile/core-information" replace />
  if (isCompleteBusiness) return <Navigate to="/dashboard/complete-profile" replace />

  return (
    <>{children}</>
  )
}

export default RequireProfileComplete