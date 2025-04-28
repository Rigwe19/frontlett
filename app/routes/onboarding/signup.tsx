import React, { useEffect, useState } from 'react'
import { LuArrowLeft, LuBuilding2, LuLink, LuMail, LuMapPin, LuPhone, LuUser, LuUserPen } from 'react-icons/lu'
import {HiOutlineIdentification} from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate, useSearchParams } from 'react-router'
import Input from '~/components/dashboard/input'
import Button from '~/components/ui/button'
import useAuth from '~/stores/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { Route } from './+types/signup'
import { get, post } from '~/libs/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useGoogleLogin } from '@react-oauth/google'
import { useLoader } from '~/stores/loaderStore'

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
    invite_code?: string,
    password: string,
    role: string
}
const schema = yup
    .object({
        full_name: yup.string().required(),
        phone_number: yup.string().matches(/^0\d{10}$/, {
            message: "phone number must be numbers of 11 characters"
        }).length(11).required(),
        password: yup.string().required().min(8),
        email: yup.string().email().required(),
        username: yup.string().required(),
        nin: yup.string().matches(/^\d{11}$/, {
            message: "NIN number must be numbers of 11 characters"
        })
        //@ts-ignore
        .length(11).when('role', (role, schema)=>{
            if(role[0] !== 'business'){
                return schema.required()
            }
        }),
        invite_code: yup.string().required(),
        confirm: yup.string().oneOf([yup.ref('password')], 'Confirm Password must match Password'),
        role: yup.string().required(),
        company_name: yup.string().when('role', {
            is: 'business',
            then: (schema) => schema.required()
        }),
        company_location: yup.string().when('role', {
            is: 'business',
            then: (schema) => schema.required()
        })
    })
    .required()
const inviteSchema = yup
    .object({
        name: yup.string().required(),
        phone_number: yup.string().matches(/^0\d{10}$/, {
            message: "phone number must be numbers of 11 characters"
        }).length(11).required(),
        email: yup.string().email().required(),
    })
    .required()
const numSchema = yup
    .object({
        phone_number: yup.string().matches(/^0\d{10}$/, {
            message: "phone number must be numbers of 11 characters"
        }).length(11).required(),
        nin: yup.string().matches(/^\d{11}$/, {
            message: "NIN number must be numbers of 11 characters"
        }).length(11)
        //@ts-ignore
        .when('role', (role, schema)=>{
            if(role[0] !== 'business'){
                return schema.required()
            }
            
        }),
        company_name: yup.string().when('role', {
            is: 'business',
            then: (schema) => schema.required()
        }),
        company_location: yup.string().when('role', {
            is: 'business',
            then: (schema) => schema.required()
        })
    })
    .required()

const Signup = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [vError, setVError] = useState({
        phone: '',
        nin: ''
    });
    const [showRequest, setShowRequest] = useState(false);
    const { register: RG, invite_code, google, updateNumber } = useAuth();
    const { alert } = useLoader();
    const [role, setRole] = useState(searchParams.get('option') ?? 'employee');
    const { formState: { errors }, register, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            role,
            invite_code,
        }
    });

    const form = useForm({
        resolver: yupResolver(numSchema),
        defaultValues: {
            phone_number: ''
        }
    });

    const invite = useForm({
        resolver: yupResolver(inviteSchema),
        defaultValues: {
            phone_number: '',
            name: '',
            email: '',
        }
    });

    const [sErrors, setSErrors] = useState<FormErrors>({
        full_name: undefined,
        username: undefined,
        phone: undefined,
        email: undefined,
        nin: undefined,
        password: undefined,
        location: undefined,
        confirm: undefined
    });

    const [ivErrors, setIVErrors] = useState<FormErrors>({
        name: undefined,
        phone: undefined,
        email: undefined,
        nin: undefined,
    });
    // console.log(form.watch())
    // useEffect(() => {
    //     const googleCode = searchParams.get("code");
    //     const state = searchParams.get('state');
    //     if (googleCode) {
    //         google({ code: googleCode, mode: "register", redirectUrl: location.origin + location.pathname, state })
    //             //     await post("http://localhost:8000/api/auth/google/callback", { code: googleCode, mode: "register" })
    //             .then((res) => {
    //                 console.log(res)
    //                 if (res.success) {
    //                     navigate("/onboarding/verify"); // Redirect after registration
    //                 }
    //             })
    //         //         .catch(() => console.error("Google register error"));
    //     }
    // }, [searchParams, navigate]);

    const onSubmit = async (form: Inputs) => {
        updateNumber(form.phone_number)
        try {
            await RG(form)
                .then(success => {
                    // const {success} = res;
                    if (success) {
                        navigate('/onboarding/verify')
                    }
                })
        } catch (error: any) {
            setSErrors(error)
        }
    }

    // console.log(watch(), errors)

    const handleGoogleAuth = async () => {
        setShowModal(true)
    }
    const handlePhoneSubmit = async (form: { phone_number: string }) => {
        updateNumber(form.phone_number)
        const role = searchParams.get('option') ?? 'employee';
        await get<{ success: boolean, url: string }>('/auth/google', {
            redirectUrl: `${location.origin + location.pathname}`,
            mode: 'signup',
        })
            .then(res => {
                const { success, url } = res.data;
                if (success) {
                    setShowModal(false)
                    window.location.href = url;
                    // console.log(url);
                }
            }).catch(e => {
                if (e.status === 422) {
                    const validationErrors: FormErrors = {};
                    for (const err in e.validationErrors) {
                        validationErrors[err] = e.validationErrors[err][0];
                    }
                    // console.log(validationErrors)
                    setVError({ phone: validationErrors.phone ?? '', nin: validationErrors.nin ?? '' })
                }
            })
        // window.location.href = `http://localhost:8000/auth/google?role=${role}&invite_code=${invite_code}&phone=${phoneNumber}`;
    }
    const handleInviteSubmit = async (form: { phone_number: string; email: string; name: string; }) => {
        await post<{phone_number: string; email: string; name: string;}, { success: boolean }>('/auth/request-invite', form)
            .then(res => {
                const { success } = res.data;
                if (success) {
                    setShowRequest(false)
                    alert('Invite link request successful, hold on and we would get back to you', 5000, 'success')
                }
            }).catch(e => {
                if (e.status === 422) {
                    const validationErrors: FormErrors = {};
                    for (const err in e.validationErrors) {
                        validationErrors[err] = e.validationErrors[err][0];
                    }
                    // console.log(validationErrors)
                    setIVErrors({ ...validationErrors })
                }
            })
    }

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setShowModal(false)
            updateNumber(form.getValues('phone_number'))
            const role = searchParams.get('option') ?? 'employee';
            // console.log(role);
            // Send the credential (ID token) to your Laravel backend
            google({
                token: tokenResponse.access_token,
                role,
                mode: 'register',
                invite_code,
                phone: form.getValues('phone_number'),
                company_name: form.getValues('company_name'),
                company_location: form.getValues('company_location')
            }).then(res => {
                if (res) {
                    navigate("/onboarding/verify"); // Redirect after registration
                }
            })
        },
        onError: (error) => {
            console.error('Google Login Failed:', error);
        },
    });

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
                <div className="gap-2 flex items-center">
                    <span className="text-[#64748B]">Have an account?</span>

                    <div className="gap-2 flex justify-end">
                        <Link to="../signin" className="border rounded-md py-1.5 px-3 dark:border-neutral-500 hover:bg-blue-50 dark:hover:bg-neutral-700">Sign In</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-9/10 xl:w-7/10 justify-center items-center gap-6">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-xl lg:text-4xl leading-8 text-center">{role === 'business' ? 'Business Signup' : 'Create your account'}</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300 text-center">{role === 'business' ? 'Create your employer account to start hiring talent' : 'Join as a virtualt and start your journey.'}</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                    {role === 'business' && <Input {...register("company_name")} error={sErrors.company_name ?? errors.company_name?.message} inputMode='text' icon={LuBuilding2} type="text" placeholder="Nimbou Service" label="Company Name" />}
                    <Input {...register("full_name")} error={sErrors.full_name ?? errors.full_name?.message} inputMode='text' autoComplete='name webauthn' icon={LuUserPen} type="text" placeholder="Tunde Amos" label={role === 'business' ? 'Contact Person' : 'Full Name'} />
                    <Input {...register("email")} error={sErrors.email ?? errors.email?.message} inputMode='email' autoComplete='name webauthn' icon={LuMail} type="email" placeholder="youremail@mail.com" label="Email" />
                    {role !== 'business' && <Input {...register("nin")} error={sErrors.nin ?? errors.nin?.message} inputMode='numeric' icon={HiOutlineIdentification} type="text" placeholder="14192639172" label="NIN Number" />}
                    <Input {...register("username")} error={sErrors.username ?? errors.username?.message} inputMode='text' autoComplete='name webauthn' icon={LuUser} type="text" placeholder="username" label="Username" />
                    <Input {...register("invite_code")} error={sErrors.invite_code ?? errors.invite_code?.message} disabled={!!invite_code} inputMode='url' icon={LuLink} type="text" placeholder="6udie9" info={<><span>An invite link is required to join.</span> <button type="button" onClick={()=>setShowRequest(true)} className="text-primary">Request Invite Code</button></>} label="Invite Link" />
                    <Input {...register("phone_number")} error={sErrors.phone_number ?? errors.phone_number?.message} inputMode='numeric' autoComplete='mobile tel' icon={LuPhone} type="text" placeholder="0902 123 6789" label="Phone Number (For OTP)" />
                    {role === 'business' && <Input {...register("company_location")} error={sErrors.company_location ?? errors.company_location?.message} inputMode='text' autoComplete='address-level3 webauthn' icon={LuMapPin} type="text" placeholder="Abuja Nigeria" label="Company Location" />}
                    <Input {...register("password")} error={sErrors.password ?? errors.password?.message} inputMode='text' autoComplete='new-password webauthn' icon={RiLockPasswordLine} type='password' placeholder="Create a strong password" label="Password" />
                    <Input {...register("confirm")} error={sErrors.confirm ?? errors.confirm?.message} inputMode='text' autoComplete='new-password webauthn' icon={RiLockPasswordLine} type='password' placeholder="Confirm your password" label="Confirm Password" />
                    <div className="flex flex-col gap-2.5 items-center w-full">
                        <Button className="w-full">Continue</Button>
                        <div className="relative flex justify-center w-full">
                            <span className=" bg-white z-10 px-2 dark:bg-neutral-900 text-[#64748B] dark:text-neutral-500">Or continue with</span>
                            <div className="border-t border-[#4B4B4B33] dark:border-[#4B4B4B] absolute left-1/2 top-1/2 w-2/3 -translate-y-1/2 -translate-x-1/2" />
                        </div>
                        <button type="button" onClick={handleGoogleAuth} className="border flex gap-1 w-full rounded-xl h-[45px] items-center dark:border-neutral-500 hover:bg-blue-50 dark:hover:bg-neutral-700 border-[#EEEEEE] justify-center">
                            <img src="/images/google.png" alt="google link" />
                            <span className="text-[#64748B] dark:text-neutral-500 text-sm leading-5">Sign up with Google</span>
                        </button>
                        <span className="text-center max-w-xs">By signing up, you agree to our <Link to="" className="text-primary">Terms of Service</Link> and <Link to="" className="text-primary">Privacy Policy</Link> </span>
                    </div>

                </form>
            </div>
            {/* <Portal> */}
                <AnimatePresence>
            {showModal && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center"
                // style={{ display: showModal ? 'flex' : 'none' }}
                onClick={() => setShowModal(false)}
            >
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
                        <div className="flex flex-col gap-4 w-full">
                            {role === 'business' && <Input
                                icon={LuBuilding2}
                                placeholder="Nimbou Service"
                                label="Company Name"
                                error={vError.phone ?? form.formState.errors.phone_number?.message}
                                className=""
                                {...form.register('company_name')}
                            />}
                            <Input
                                icon={LuPhone}
                                type="tel"
                                placeholder="0902 4586 789"
                                label="Phone Number"
                                error={vError.phone ?? form.formState.errors.phone_number?.message}
                                inputMode='numeric'
                                autoComplete='mobile tel'
                                // value={phoneNumber}
                                // onChange={(e) => setPhoneNumber(e.target.value)}
                                className=""
                                {...form.register('phone_number')}
                            />
                            {role !== 'business' && <Input
                                icon={HiOutlineIdentification}
                                type="tel"
                                placeholder="0902 4586 789"
                                label="NIN Number"
                                error={vError.nin ?? form.formState.errors.nin?.message}
                                inputMode='numeric'
                                // value={phoneNumber}
                                // onChange={(e) => setPhoneNumber(e.target.value)}
                                className=""
                                {...form.register('phone_number')}
                            />}

                            {role === 'business' && <Input
                                icon={LuMapPin}
                                placeholder="Abuja Nigeria"
                                label="Company Location"
                                error={vError.phone ?? form.formState.errors.phone_number?.message}
                                {...form.register('company_location')}
                            />}

                            <Button onClick={() => login()} className="w-full">
                                Submit
                            </Button>
                        </div>

                    </motion.div>

            </motion.div>}
            {showRequest && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center"
                // style={{ display: showModal ? 'flex' : 'none' }}
                onClick={() => setShowRequest(false)}
            >
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
                            onClick={() => setShowRequest(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                        <form onSubmit={invite.handleSubmit(handleInviteSubmit)} className="flex flex-col gap-4 w-full">
                            
                            <Input
                                icon={LuUser}
                                placeholder="Sada Haruna"
                                label="Full Name"
                                error={ivErrors.name ?? invite.formState.errors.name?.message}
                                {...invite.register('name')}
                            />

                            <Input
                                icon={LuMail}
                                placeholder="youremail@mail.com"
                                label="Email Address"
                                error={ivErrors.email ?? invite.formState.errors.email?.message}
                                {...invite.register('email')}
                            />
                            <Input
                                icon={LuPhone}
                                type="tel"
                                placeholder="0902 4586 789"
                                label="Phone Number"
                                error={ivErrors.phone ?? invite.formState.errors.phone_number?.message}
                                inputMode='numeric'
                                autoComplete='mobile tel'
                                className=""
                                {...invite.register('phone_number')}
                            />

                            <Button className="w-full">
                                Submit
                            </Button>
                        </form>

                    </motion.div>

            </motion.div>}
                </AnimatePresence>
            {/* </Portal> */}

        </div>
    )
}

export default Signup