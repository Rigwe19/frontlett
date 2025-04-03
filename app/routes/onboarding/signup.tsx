import React, { useEffect, useState } from 'react'
import { LuArrowLeft, LuLink, LuMail, LuPhone, LuUserPen } from 'react-icons/lu'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate, useSearchParams } from 'react-router'
import Input from '~/components/dashboard/input'
import Button from '~/components/ui/button'
import useAuth from '~/stores/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { Route } from './+types/signup'
import { get } from '~/libs/axios'
import { motion, AnimatePresence } from 'framer-motion'

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Register" },
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
    full_name: string,
    phone_number: string,
    email: string,
    invite_code: string,
    password: string,
    role: string
}
const schema = yup
    .object({
        full_name: yup.string().required(),
        phone_number: yup.string().min(11).max(13).required(),
        password: yup.string().required().min(8),
        email: yup.string().email().required(),
        invite_code: yup.string().required(),
        // confirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        role: yup.string().required(),
    })
    .required()

const Signup = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { register: RG, invite_code, google } = useAuth();
    const { formState: { errors }, register, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            role: searchParams.get('option') ?? 'employee',
            invite_code,
        }
    });
    const [sErrors, setSErrors] = useState<FormErrors>({
        full_name: undefined,
        username: undefined,
        phone: undefined,
        email: undefined,
        password: undefined,
        location: undefined,
        confirm: undefined
    });

    useEffect(() => {
        const googleCode = searchParams.get("code");
        const state = searchParams.get('state');
        if (googleCode) {
            google({ code: googleCode, mode: "register", redirectUrl: location.origin + location.pathname, state })
            //     await post("http://localhost:8000/api/auth/google/callback", { code: googleCode, mode: "register" })
            .then((res) => {
                navigate("/dashboard/profile"); // Redirect after registration
            })
            //         .catch(() => console.error("Google register error"));
        }
    }, [searchParams, navigate]);

    const onSubmit = async (form: Inputs) => {
        try {
            await RG(form)
                .then(success => {
                    // const {success} = res;
                    if (success) {
                        navigate('onboarding/verify')
                    }
                })
        } catch (error: any) {
            setSErrors(error)
        }
    }

    const handleGoogleAuth = async () => {
        setShowModal(true)
    }
    const handlePhoneSubmit = async () => {
        setShowModal(false)
        const role = searchParams.get('option') ?? 'employee';
        await get<{ success: boolean, url: string }>('/auth/google', {
            redirectUrl: `${location.origin + location.pathname}`,
            mode: 'signup',
            role, invite_code, phone: phoneNumber
        })
            .then(res => {
                const { success, url } = res.data;
                if (success) {
                    window.location.href = url;
                    // console.log(url);
                }
            })
        // window.location.href = `http://localhost:8000/auth/google?role=${role}&invite_code=${invite_code}&phone=${phoneNumber}`;
    }

    return (
        <div className="flex relative items-center flex-col min-h-screen font-general">
            <div className="absolute h-2.5 top-0 left-0 right-0 grid grid-cols-4">
                <div className="bg-primary w-full h-full col-span-3"></div>
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
            <div className="flex flex-col w-9/10 xl:w-7/10 justify-center items-center gap-6">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-xl lg:text-4xl leading-8 text-center">Create your account</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300">Join as a virtualt and start your journey.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                    <Input {...register("full_name")} error={sErrors.full_name ?? errors.full_name?.message} inputMode='text' autoComplete='name webauthn' icon={LuUserPen} type="text" placeholder="James Bond" label="Full Name" />
                    <Input {...register("email")} error={sErrors.email ?? errors.email?.message} inputMode='email' autoComplete='name webauthn' icon={LuMail} type="email" placeholder="youremail@mail.com" label="Email" />
                    <Input {...register("invite_code")} error={sErrors.invite_code ?? errors.invite_code?.message} disabled={!!invite_code} inputMode='url' icon={LuLink} type="text" placeholder="frontlett.invite/20345" info={<><span>An invite link is required to join as a resource.</span> <Link className="text-primary" to="">Request Invite Code</Link></>} label="Invite Link" />
                    <Input {...register("phone_number")} error={sErrors.phone_number ?? errors.phone_number?.message} inputMode='numeric' autoComplete='mobile tel' icon={LuPhone} type="text" placeholder="+234 123 456 789" label="Phone Number (For OTP)" />
                    <Input {...register("password")} error={sErrors.password ?? errors.password?.message} inputMode='text' autoComplete='new-password webauthn' icon={RiLockPasswordLine} type='password' placeholder="Create a strong password" label="Password" />
                    <div className="flex flex-col gap-2.5 items-center w-full">
                        <Button className="w-full">Continue</Button>
                        <div className="relative flex justify-center w-full">
                            <span className=" bg-white z-10 px-2 dark:bg-neutral-900 text-[#64748B] dark:text-neutral-500">Or continue with</span>
                            <div className="border-t border-[#4B4B4B33] dark:border-[#4B4B4B] absolute left-1/2 top-1/2 w-2/3 -translate-y-1/2 -translate-x-1/2" />
                        </div>
                        <button type="button" onClick={handleGoogleAuth} className="border flex gap-1 w-full rounded-xl h-[45px] items-center dark:border-neutral-500 border-[#EEEEEE] justify-center">
                            <img src="/images/google.png" alt="google link" />
                            <span className="text-[#64748B] dark:text-neutral-500 text-sm leading-5">Sign up with Google</span>
                        </button>
                        <span className="text-center max-w-xs">By signing up, you agree to our <Link to="" className="text-primary">Terms of Service</Link> and <Link to="" className="text-primary">Privacy Policy</Link> </span>
                    </div>

                </form>
            </div>
            {/* <Portal> */}
            {showModal && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center"
                // style={{ display: showModal ? 'flex' : 'none' }}
                onClick={() => setShowModal(false)}
            >
                <AnimatePresence>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-96 flex flex-col gap-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-semibold">Enter Phone Number</h3>
                        <Input
                            icon={LuPhone}
                            type="tel"
                            placeholder="+234 123 456 789"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className=""
                        />
                        <Button onClick={handlePhoneSubmit} className="w-full">
                            Submit Phone Number
                        </Button>
                    </motion.div>
                </AnimatePresence>

            </motion.div>}
            {/* </Portal> */}

        </div>
    )
}

export default Signup