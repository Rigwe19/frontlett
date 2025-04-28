import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowRight, LuFactory } from 'react-icons/lu'
import { PiUsersThree } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router'
import * as yup from "yup"
import DragAndDrop from '~/components/dashboard/drag-and-drop'
import Input from '~/components/dashboard/input'
import Select from '~/components/dashboard/select'
import Button from '~/components/ui/button'
import { post } from '~/libs/axios'
import { industries, sizes } from '~/libs/industries'
import type { Route } from './+types/company-verification'

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Company Verification" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}

interface FormErrors {
    [key: string]: string | undefined;
}

type Inputs = {
    industry: string,
    size: string,
    rc?: string
    // email: string,
}
const schema = yup
    .object({
        industry: yup.string().required(),
        size: yup.string().required(),
        rc: yup.string().length(7).matches(/^\d{7}$/, {
            message: "RC number must be numbers of 7 characters"
        })
        // phone_number: yup.string().matches(/^0\d{10}$/, {
        //     message: "phone number must be numbers of 11 characters"
        // }).length(11).required(),
    })
    .required()


const CompanyVerification = () => {
    const navigate = useNavigate()
    // const [files, setFiles] = useState<File[]>([]);
    const { formState: { errors }, register, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            industry: '',
            size: '',
            rc: ''
        }
    });
    const [sErrors, setSErrors] = useState<FormErrors>({
        industry: undefined,
        size: undefined,
        rc: undefined,
    });

    const onSubmit = async (form: Inputs) => {
        // if(files.length === 0) {
        //     setSErrors(pv=>({...pv, document: 'Please add at least on document to continue'}))
        //     return;
        // }
        // const formData = new FormData();
        // formData.append('industry', form.industry);
        // formData.append('size', form.size);
        // files.forEach((file, index) => {
        //     formData.append(`documents[${index}]`, file);
        // });

        try {
            await post('auth/company-verification', form);
            navigate('/dashboard');
        } catch (error) {
            // console.error('Error:', error);
            setSErrors((prev) => ({
            ...prev,
            // document: 'An error occurred while submitting the form. Please try again.',
            }));
        }
    }

    return (
        <div className="flex relative items-center flex-col min-h-screen font-general">
            <div className="absolute h-2.5 top-0 left-0 right-0 grid grid-cols-4">
                <div className="bg-primary w-full h-full col-span-4"></div>
            </div>
            <div className="w-full h-[45px] justify-end items-center flex mt-6 px-8">
                <div className="gap-2 flex justify-end">
                    <Link to="/dashboard/profile" className="border rounded-md py-1.5 px-3 dark:border-neutral-500 hover:bg-blue-50 dark:hover:bg-neutral-700">Skip</Link>
                </div>
            </div>
            <div className="flex flex-col w-9/10 xl:w-7/10 justify-center items-center gap-6 flex-1">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-xl lg:text-4xl xl:leading-10 lg:leading-8 text-center">Verification</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300">Create your employer account to start hiring talent</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full items-center">
                    <Select {...register("industry")} data={industries.map(id => ({ label: id, value: id }))} error={sErrors.industry ?? errors.industry?.message} icon={LuFactory} placeholder="Select Industry" label="Industry Type" />
                    <Select {...register("size")} data={sizes.map(id => ({ label: id, value: id }))} error={sErrors.size ?? errors.size?.message} icon={LuFactory} placeholder="Select Size" label="Company Size" />
                    <Input {...register("rc")} error={sErrors.rc ?? errors.rc?.message} inputMode='text' icon={PiUsersThree} placeholder="8271028" label="Registration Number"  />
                    {/* <DragAndDrop onChange={(e: File[])=>setFiles(e)} error={sErrors.document} /> */}
                    <div className="flex flex-col gap-2.5 items-center w-full">
                        <Button className="w-full">Continue <LuArrowRight /></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanyVerification