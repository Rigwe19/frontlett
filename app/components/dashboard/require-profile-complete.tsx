import { useEffect, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { get } from '~/libs/axios'
import useAuth from '~/stores/authStore'

type Props = {}

const RequireProfileComplete = ({ children }: PropsWithChildren) => {
  const { token, user, updateStep, fetchCurrentUser } = useAuth()
  const currentPath = location.pathname;

  useEffect(() => {
    const getProfile = async () => {
      try {
        await fetchCurrentUser()
        const res = await get<{ success: boolean, profile: { steps: number; } }>('profile')
        const { success, profile: { steps } } = res.data;
        if (success) {
          updateStep(steps)
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }
    getProfile();
  }, [fetchCurrentUser, updateStep]);

  if (!token) return <Navigate to="/onboarding/signin" />
  if (!user) return null; // Or a loading indicator

  const isVerified = !!user.phone_verified_at;
  if (!isVerified) {
    return <Navigate to="/onboarding/verify" replace />;
  }

  const isOnCompleteProfilePage = currentPath.includes('complete-profile');
  if (!user.profile?.is_completed && !isOnCompleteProfilePage) {
    return user.role === 'business'
      ? <Navigate to="/dashboard/complete-profile" replace />
      : <Navigate to="/dashboard/complete-profile/core-information" replace />;
  }
  const subscribe = !!user?.subscription;
  const isOnPricing = currentPath.includes('pricing')
  console.log(subscribe, isOnPricing, user?.profile?.is_completed)
  if (!subscribe && !isOnPricing && user?.profile?.is_completed) return <Navigate to="/dashboard/pricing" replace />

  return (
    <>{children}</>
  )
}

export default RequireProfileComplete