import { useState } from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router'
import OtpInput, { type InputProps } from 'react-otp-input'
import Button from '~/components/ui/button'

type Props = {}

const VerifyCode = (props: Props) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    
    return (
        <div className="flex relative items-center flex-col min-h-screen font-general">
            <div className="absolute h-2.5 top-0 left-0 right-0 grid grid-cols-4">
                <div className="bg-primary w-full h-full col-span-4"></div>
            </div>
            <div className="w-full h-[45px] justify-between items-center flex mt-6 px-8">
                <button onClick={() => navigate(-1)} className="flex gap-1 items-center cursor-pointer">
                    <LuArrowLeft />
                    Go back
                </button>
                <div className="gap-2 flex">
                    <span className="text-[#64748B]">Already have an account?</span>
                    <Link to="../signin">Sign In</Link>
                </div>
            </div>
            <div className="flex flex-col w-9/10 xl:w-7/10 justify-center items-center gap-6 flex-1">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-xl lg:text-4xl leading-8 text-center">Verify your Phone Number</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300">We've sent a verification code to 0904500470</p>
                </div>
                <div className="flex flex-col gap-5 w-full items-center">
                    <p className="">Enter 6-digit code</p>
                    <OtpInput value={otp} onChange={setOtp} numInputs={4} renderInput={(props) => <input {...props} className="border border-[#F0F4FF] dark:border-neutral-500 rounded-xl !w-16 h-16 not-first:ml-4" />} />
                    <div className="text-sm leading-5 flex gap-1">
                        <span className="text-[#64748B] dark:text-neutral-500">Didn’t receive the code?</span>
                        <button className="text-primary">Resend</button>
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 items-center w-full">
                    <Button to="../verify" className="w-full">Continue to Profile Setup <LuArrowRight /></Button>
                </div>
            </div>
        </div>
    )
}

export default VerifyCode