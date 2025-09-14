import { useEffect } from 'react'
import { FaCheck, FaEnvelope } from 'react-icons/fa6'
import { Navigate, Outlet, useSearchParams, useNavigate } from 'react-router'
import useAuth, { getAuthState } from '~/stores/authStore'
import type { Route } from './+types'

type Props = {}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    // const authState = getAuthState();
    // await authState.updateUser(null)
    return {
    }
}
const Onboarding = (props: Props) => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const isEmployer = ():boolean => {
        if(location.pathname === '/onboarding/company-verification') return true;
        if(searchParams.get('option') === 'business') return true;
        return false;
    } 
    // useEffect(() => {
    //     if () {
    //         navigate('/dashboard/profile', { replace: true })
    //     }
    //     if () {
    //         navigate('/onboarding/get-started', { replace: true })
    //     }
    // }, []);
    console.log(['verify', 'company-verification'].includes(location.pathname))
    if(!['verify', 'company-verification'].some(path=>location.pathname.includes(path)) && token) return <Navigate to="/dashboard" replace />
    // if(token) return <Navigate to="/dashboard" replace />
    if(location.pathname === '/onboarding' || location.pathname === '/onboarding/') return <Navigate to="/onboarding/get-started" replace />
    return (
        <div className="flex text-general h-screen overflow-hidden">
            <div className="w-1/2 hidden md:flex max-h-screen overflow-hidden items-center relative justify-center" style={{ backgroundImage: "url(/images/onboarding.webp)" }}>
                <div className="absolute inset-0 bg-cover bg-no-repeat" style={{
                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.81) 100%), url(/images/onboarding.webp)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }} />
                {isEmployer() && <div className="flex flex-col gap-4">
                    <div className="flex flex-col z-10 gap-4 text-white">
                        <h2 className="font-bold lg:text-4xl text-2xl leading-10">Hire the right people</h2>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full h-5 w-5 bg-white/20 flex justify-center items-center blur-2">
                                <FaCheck size={12} />
                            </div>
                            <p className="leading-7">Book talents in flexible 2-hour slots</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full h-5 w-5 bg-white/20 flex justify-center items-center blur-2">
                                <FaCheck size={12} />
                            </div>
                            <p className="leading-7">Get matched with vetted professionals</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full h-5 w-5 bg-white/20 flex justify-center items-center blur-2">
                                <FaCheck size={12} />
                            </div>
                            <p className="leading-7">Track progress, pay only for results</p>
                        </div>
                        <div className="flex items-center mb-10 z-20">
                            <div className="flex mr-3">
                                <img src="/images/trusted/1.png" alt="" className="w-8 h-8 rounded-full bg-gray-300 " />
                                <img src="/images/trusted/2.png" alt="" className="w-8 h-8 rounded-full bg-gray-300 -ml-2.5" />
                                <img src="/images/trusted/3.png" alt="" className="w-8 h-8 rounded-full bg-gray-300 -ml-2.5" />
                            </div>
                            <span className="text-xs text-[#FFFFFFB2]">Trusted by 50k+ Companies</span>
                        </div>
                    </div>
                </div>}
                {!isEmployer() && <div className="flex flex-col gap-4">
                    <div className="flex flex-col z-10 gap-4 text-white">
                        <h2 className="font-bold lg:text-4xl text-2xl leading-10">Work on Your Term</h2>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full h-5 w-5 bg-white/20 flex justify-center items-center blur-2">
                                <FaCheck size={12} />
                            </div>
                            <p className="leading-7">Set your available slots</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full h-5 w-5 bg-white/20 flex justify-center items-center blur-2">
                                <FaCheck size={12} />
                            </div>
                            <p className="leading-7">Get matched with ideal projects</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full h-5 w-5 bg-white/20 flex justify-center items-center blur-2">
                                <FaCheck size={12} />
                            </div>
                            <p className="leading-7">Secure and instant payments</p>
                        </div>
                        <div className="flex items-center mb-10 z-20">
                            <div className="flex mr-3">
                                <img src="/images/trusted/1.png" alt="" className="w-8 h-8 rounded-full bg-gray-300 " />
                                <img src="/images/trusted/2.png" alt="" className="w-8 h-8 rounded-full bg-gray-300 -ml-2.5" />
                                <img src="/images/trusted/3.png" alt="" className="w-8 h-8 rounded-full bg-gray-300 -ml-2.5" />
                            </div>
                            <span className="text-xs text-[#FFFFFFB2]">Trusted by 50k+ Companies</span>
                        </div>
                    </div>
                </div>}
                <div className="absolute bottom-0 right-0 left-0 h-4 flex justify-center gap-[7px]">
                    <div className="rounded-full h-[9px] w-[9px] bg-primary"></div>
                    <div className="rounded-full h-[9px] w-[9px] bg-[#E5EEFF]"></div>
                    <div className="rounded-full h-[9px] w-[9px] bg-[#E5EEFF]"></div>
                </div>
            </div>
            <div className="md:w-1/2 w-full overflow-auto">
                <Outlet />
            </div>
            {/* <Input placeholder='youremail@mail.com' icon={FaEnvelope} error="a very big error" />
        <Input type="password" info="An invite link is required to join as a resource." /> */}
        </div>
    )
}

export default Onboarding
