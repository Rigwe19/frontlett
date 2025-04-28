import React from 'react'
import { Link } from 'react-router'
import Button from '~/components/ui/button'

type Props = {}

const GetStarted = (props: Props) => {
    return (
        <div className="flex relative justify-center items-center min-h-screen font-general">
            <div className="absolute h-2.5 top-0 left-0 right-0 grid grid-cols-4">
                <div className="bg-primary w-full h-full"></div>
            </div>
            <div className="flex flex-col w-7/10 justify-center items-center gap-8">
                <img src="/logo.png" alt="" className="w-[106px] dark:hidden" />
                <img src="/logo-white.svg" alt="" className="w-[106px] hidden dark:block" />
                <h2 className="font-bold text-2xl leading-8">Join the World's 1st Staff & Work Share Platform</h2>
                <Button to="/onboarding/option" className='font-general w-full'>Join as Resource</Button>
                <Button to="/onboarding/signup?option=business" outline className='font-general w-full'>I'm a Business</Button>
                <p className="text-sm leading-5">
                    Already have an account?{" "}
                    <Link to="/onboarding/signin" className="text-primary">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default GetStarted