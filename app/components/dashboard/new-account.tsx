import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from './select';
import Input from './input';
import { industries, sizes } from '~/libs/industries'

const schema = yup.object().shape({
    role: yup.string().required('Role is required'),
    industry: yup.string().when('role', {
        is: 'business',
        then: (schema) => schema.required('Industry is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
    rc: yup.string().when('role', {
        is: 'business',
        then: (schema) => schema.required('RC is required').length(7).matches(/^\d{7}$/, {
            message: "RC number must be numbers of 7 characters"
        }),
        otherwise: (schema) => schema.notRequired(),
    }),
    size: yup.string().when('role', {
        is: 'business',
        then: (schema) => schema.required('Size is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

type FormValues = {
    role: string;
    industry?: string;
    rc?: string;
    size?: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (result: FormValues) => void;
};
const options = [{
    label: 'Business',
    value: 'business',
}, {
    label: 'Advisor',
    value: 'advisor'
}, {
    label: 'Influencer',
    value: 'influencer'
}, {
    label: 'Resource',
    value: 'resource'
}]

export default function NewAccountModal({ open, onClose, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: { role: '', industry: '', rc: '', size: '' },
    });

    const role = watch('role');

    const submitHandler = (data: FormValues) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Transition show={open} as={motion.div} static>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Transition.Child
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 bg-opacity-30"
                    />
                    <Transition.Child
                        as={motion.div}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-20"
                    >
                        <Dialog.Title className="text-lg font-medium mb-4">Add New Account</Dialog.Title>
                        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                            <Select {...register("role")} data={options} error={errors.role?.message} placeholder="Select Role" label="Role" />

                            {role === 'business' && (
                                <>
                                    <Select {...register("industry")} data={industries.map(id => ({ label: id, value: id }))} error={errors.industry?.message} placeholder="Select Industry" label="Company Industry Type" />
                                    <Input {...register("rc")} error={errors.rc?.message} placeholder="1289383" label="RC Number" />
                                    <Select {...register("size")} data={sizes.map(id => ({ label: id, value: id }))} error={errors.size?.message} placeholder="Select Size" label="Company Size" />
                                    {/* <div>
                                        <label className="block mb-1 font-medium">Industry</label>
                                        <input
                                            {...register('industry')}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="Industry"
                                        />
                                        {errors.industry && (
                                            <p className="text-red-500 text-sm">{errors.industry.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">RC</label>
                                        <input
                                            {...register('rc')}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="RC"
                                        />
                                        {errors.rc && <p className="text-red-500 text-sm">{errors.rc.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Size</label>
                                        <input
                                            {...register('size')}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="Size"
                                        />
                                        {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
                                    </div> */}
                                </>
                            )}

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200"
                                    onClick={() => {
                                        reset();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-blue-600 text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}