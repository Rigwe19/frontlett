import { useEffect, useState } from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router'
import OtpInput, { type InputProps } from 'react-otp-input'
import Button from '~/components/ui/button'
import { post } from '~/libs/axios'
import type { AxiosResponse } from 'axios'
import useAuth from '~/stores/authStore'

// interface ValidationError {
//     field: string;
//     message: string;
//   }
  
  interface FormErrors {
    [key: string]: string;
  }
const VerifyCode = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState<any>(120);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState('');
    const { number } = useAuth()
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimer: number) => {
                if (lastTimer === 0) {
                    setCompleted(true)
                    clearInterval(interval)
                } else {
                    if (lastTimer <= 1) {
                        clearInterval(interval);
                        setCompleted(true)
                    }
                    return lastTimer - 1;
                }
            })
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, []);

    const handleResend = async () => {
        try {
            const response: AxiosResponse = await post('/auth/otp/send', {
                phone: number,
            })
            const { success } = response.data;
            if (success) {
                setOtp('')
                setCompleted(false); setTimer(120)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const verify = async () => {
        setError('')
        if (!/^\d{4}$/.test(otp)) {
            setError('invalid Otp')
            return
        }
        // if (!otp || otp.length < 4) {
        //     setError('invalid Otp')
        //     return
        // }
        try {
            const response: AxiosResponse = await post('/auth/otp/confirm', {
                code: otp,
                phone: number,
            })
            const { success } = response.data;
            if (success) {
                navigate('/dashboard/profile')
            }
        } catch (error:any) {
            if (error.status === 422) {
                const validationErrors: FormErrors = {};
                for (const err in error.validationErrors) {
                  validationErrors[err] = error.validationErrors[err][0];
                }
                setError(validationErrors.code)
              }
        }

    }

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
                    <h2 className="font-bold text-xl lg:text-4xl xl:leading-10 lg:leading-8 text-center">Verify your Phone Number</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300">We've sent a verification code to {number}</p>
                </div>
                <div className="flex flex-col gap-5 w-full items-center">
                    <p className="">Enter 4-digit code</p>
                    <OtpInput value={otp} onChange={setOtp} numInputs={4} renderInput={(props) => <input {...props} className={`border ${error ? 'border-red-500' : 'border-[#F0F4FF] dark:border-neutral-500'} rounded-xl !w-16 h-16 not-first:ml-4`} />} />
                    {error && <span className="text-red-500 text-xs">{error}</span>}
                    <div className="text-sm leading-5 flex gap-1">
                        <span className="text-[#64748B] dark:text-neutral-500">Didn’t receive the code?</span>
                        {!completed && <>
                            <span className="text-[#64748B] dark:text-neutral-200">Resend code in </span>
                            <span className="text-[#64748B] dark:text-neutral-200">{new Date(1000 * timer).toISOString().substring(14, 19)}</span>
                        </>}
                        {completed &&
                            <button type="button" onClick={handleResend} className="text-primary">Resend</button>}
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 items-center w-full">
                    <Button onClick={verify} className="w-full">Continue to Profile Setup <LuArrowRight /></Button>
                </div>
            </div>
        </div>
    )
}

export default VerifyCode