import React, { useEffect, useState } from 'react'
import { LuMail } from 'react-icons/lu'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate, useSearchParams } from 'react-router'
import Input from '~/components/dashboard/input'
import Button from '~/components/ui/button'
import type { Route } from './+types/login'
import useAuth from '~/stores/authStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { get } from '~/libs/axios'
import { useGoogleLogin } from '@react-oauth/google'

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Login" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}


interface ValidationError {
    field: string;
    message: string;
}

interface FormErrors {
    [key: string]: string | undefined;
}

type Inputs = {
    email: string,
    password: string,
}
const schema = yup
    .object({
        password: yup.string().required().min(8),
        email: yup.string().email().required(),
    })
    .required()

const Login = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    // console.log(location.pathname)
    const { signIn, google, token } = useAuth();
    const { formState: { errors }, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const [sErrors, setSErrors] = useState<FormErrors>({
        email: undefined,
        password: undefined,
    });

    useEffect(() => {
        const googleCode = searchParams.get("code");
        if (googleCode) {
            google({ code: googleCode, mode: "register", redirectUrl: location.origin + location.pathname })
                //     await post("http://localhost:8000/api/auth/google/callback", { code: googleCode, mode: "register" })
                .then((res) => {
                    // localStorage.setItem("token", res.data.token);
                    navigate("/dashboard"); // Redirect after registration
                })
            //         .catch(() => console.error("Google register error"));
        }
    }, [searchParams, navigate]);
    const onSubmit = async (form: Inputs) => {
        try {
            await signIn(form)
                .then(({success, verified}) => {
                    if(!verified && success) {
                        navigate('/onboarding/verify')
                    }
                    if (success && verified) {
                        navigate('/dashboard')
                    }
                })
        } catch (error: any) {
            setSErrors(error)
        }

    }
    const googleAuth = async () => {
        await get<{ success: boolean, url: string }>(`/auth/google?redirectUrl=${location.origin + location.pathname}&mode=signin`)
            .then(res => {
                const { success, url } = res.data;
                if (success) {
                    window.location.href = url;
                }
            })
    }

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // console.log(tokenResponse);
            // Send the credential (ID token) to your Laravel backend
            google({ mode: "login", token: tokenResponse.access_token })
            .then(res=> {
                if(res) {
                    navigate('/dashboard')
                }
            })
        },
        onError: (error) => {
            console.error('Google Login Failed:', error);
        },
    });


    return (
        <div className="flex relative items-center flex-col min-h-screen font-general">
            <div className="w-full h-[45px] justify-end items-center flex mt-6 px-8">
                <div className="gap-2 flex items-center">
                    <span className="text-[#64748B]">Don't have an account?</span>

                    <div className="gap-2 flex justify-end">
                        <Link to="../get-started" className="border rounded-md py-1.5 px-3 dark:border-neutral-500 hover:bg-blue-50 dark:hover:bg-neutral-700">Sign Up</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-9/10 xl:w-7/10 justify-center items-center flex-1 gap-6">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-xl lg:text-4xl leading-8 text-center">Login to your account</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300">Continue your journey as a virtualt</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                    <Input {...register("email")} error={sErrors.email ?? errors.email?.message} icon={LuMail} placeholder="youremail@mail.com" label="Email" />
                    <Input {...register("password")} error={sErrors.password ?? errors.password?.message} icon={RiLockPasswordLine} type='password' placeholder="************" label="Password" />
                    <Link to="/onboarding/forgot-password" className="self-end text-sm font-medium text-[#64748B] dark:text-neutral-400">Forgot Password?</Link>
                    <div className="flex flex-col gap-2.5 items-center w-full">
                        <Button className="w-full">Continue</Button>
                        <div className="relative flex justify-center w-full">
                            <span className=" bg-white z-10 px-2 dark:bg-neutral-900 text-[#64748B] dark:text-neutral-500">Or continue with</span>
                            <div className="border-t border-[#4B4B4B33] dark:border-[#4B4B4B] absolute left-1/2 top-1/2 w-2/3 -translate-y-1/2 -translate-x-1/2" />
                        </div>
                        <button onClick={() => login()} type="button" className="border flex gap-1 w-full rounded-xl h-[45px] items-center dark:border-neutral-500 hover:bg-blue-50 dark:hover:bg-neutral-700 border-[#EEEEEE] justify-center">
                            <img src="/images/google.png" alt="google link" />
                            <span className="text-[#64748B] dark:text-neutral-500 text-sm leading-5">Sign in with Google</span>
                        </button>
                        <span className="text-center max-w-xs">By signing in, you agree to our <Link to="" className="text-primary">Terms of Service</Link> and <Link to="" className="text-primary">Privacy Policy</Link> </span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login