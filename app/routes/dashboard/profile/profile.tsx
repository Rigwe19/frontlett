import { LuArrowRight, LuBriefcase, LuBuilding, LuCalendar, LuCamera, LuCircleCheckBig, LuGraduationCap, LuMapPin, LuPencilLine, LuStar, LuUser, LuPlus, LuUpload, LuTrash2, LuClock } from 'react-icons/lu';
import Button from '~/components/ui/button';
import useAuth from '~/stores/authStore';
import { useLoader } from '~/stores/loaderStore';
import type { Route } from './+types/profile';
import { get, post } from '~/libs/axios';
import BusinessProfile from '~/components/dashboard/business-profile';


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Profile" },
        { name: "description", content: "Join as a freelancer and start your journey." },
    ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const res = await get<{
        success: boolean,
        user: any,
        profile: {
            availability: {
                [key: string]: string[]
            }
            professional_headline: string;
            about: string;
            skills: string[];
            profile_picture: string;
            dp: string | undefined;
            address: string;
        },
        portfolio: {
            id: number;
            title: string;
            description: string;
            path: string;
        }[],
        education: {
            id: number;
            degree: string;
            institution: string;
            started_at: string;
            ended_at: string;
        }[],
        experiences: {
            id: number;
            title: string;
            company: string;
            started_at: string;
            ended_at: string;
            is_present: string;
        }[],
        percentage_completed: number
    }>('profile')

    const { success, user, profile, portfolio, education, experiences, percentage_completed } = res.data;
    if (success) {
        if (profile?.profile_picture) {
            profile.dp = import.meta.env.VITE_BASE_SERVICE_URL + profile?.profile_picture;
        }
        return {
            user,
            profile,
            portfolio,
            education,
            experiences,
            percentage_completed
        }
        // setJobs(jobs);
        // setDashboard([jobs.length, applicants, 0, 0])
    }
}

import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Modal from '~/components/dashboard/modal';
import Input from '~/components/dashboard/input';
import Textarea from '~/components/dashboard/textarea';
import Skills from '~/components/dashboard/skills';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Portal from '~/components/dashboard/portal';
import { Cropper, type CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

import AvailabilityModal from '~/components/availability-modal';
import { useApiForm } from '~/libs/useApiForm';
const profileSchema = yup.object().shape({
    professional_headline: yup.string().required('Professional headline is required'),
    address: yup.string().required('Location is required'),
});

const aboutSchema = yup.object().shape({
    about: yup.string().required('About section cannot be empty.'),
});

const skillsSchema = yup.object().shape({
    skills: yup.array().of(yup.string().required()).min(1, 'Please add at least one skill.'),
});

const portfolioSchema = yup.object().shape({
    title: yup.string().required('Project title is required.'),
    description: yup.string().required('Project description is required.'),
    image: yup.mixed<File>().when('$isEditing', (isEditing, schema) => isEditing ? schema.notRequired() : schema.required('An image is required.')),
});

const experienceSchema = yup.object().shape({
    title: yup.string().required('Job title is required.'),
    company: yup.string().required('Company is required.'),
    started_at: yup.string().required('Start date is required.'),
    is_present: yup.boolean().default(false),
    ended_at: yup.string().when('is_present', {
        is: false,
        then: schema => schema.required('End date is required if not currently working here.'),
        otherwise: schema => schema.notRequired()
    })
});

const educationSchema = yup.object().shape({
    degree: yup.string().required('Degree is required.'),
    institution: yup.string().required('Institution is required.'),
    started_at: yup.string().required('Start date is required.'),
    is_present: yup.boolean().default(false),
    ended_at: yup.string().when('is_present', {
        is: false,
        then: schema => schema.required('End date is required if not currently studying here.'),
        otherwise: schema => schema.notRequired()
    })
});
interface Image {
    type?: string;
    src: string;
}

const Profile = ({ loaderData }: Route.ComponentProps) => {
    const { updateUser } = useAuth();
    const { alert } = useLoader();
    const navigate = useNavigate();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState<any>(null);
    const [portfolios, setPortfolios] = useState(loaderData?.portfolio ?? []);
    const [experiences, setExperiences] = useState(loaderData?.experiences ?? []);
    const [education, setEducation] = useState(loaderData?.education ?? []);
    const [profile, setProfile] = useState<{
            availability: {
                [key: string]: string[]
            }
            professional_headline: string;
            about: string;
            skills: string[];
            profile_picture: string;
            dp: string | undefined;
            address: string;
        }>(loaderData?.profile || {} as any);
    const [editingExperience, setEditingExperience] = useState<any>(null);
    const [editingEducation, setEditingEducation] = useState<any>(null);
    const [openCropper, setOpenCropper] = useState(false);
    const [image, setImage] = useState<Image | null>(null);
    const [file, setFile] = useState<File>();
    const cropperRef = useRef<CropperRef>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        onConfirm: (() => void) | null;
        isLoading: boolean;
        title: string;
        message: string;
    }>({
        isOpen: false,
        onConfirm: null,
        title: '',
        isLoading: false,
        message: '',
    });
    const { register: profileRegister, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            professional_headline: profile?.professional_headline ?? '',
            address: profile?.address ?? '',
        }
    });

    const { register: aboutRegister, handleSubmit: handleAboutSubmit, formState: { errors: aboutErrors } } = useForm({
        resolver: yupResolver(aboutSchema),
        defaultValues: {
            about: profile?.about ?? ''
        }
    });

    const { register: skillsRegister, handleSubmit: handleSkillsSubmit, formState: { errors: skillsErrors }, setValue: setSkillsValue, watch: watchSkills, } = useForm({
        resolver: yupResolver(skillsSchema),
        defaultValues: {
            skills: profile?.skills ?? []
        }
    });

    const { register: portfolioRegister, handleSubmit: handlePortfolioSubmit, formState: { errors: portfolioErrors }, setValue: setPortfolioValue, watch: watchPortfolio, reset: resetPortfolio } = useForm({
        resolver: yupResolver(portfolioSchema),
        context: {
            $isEditing: !!editingPortfolio
        },
        defaultValues: {
            title: '',
            description: '',
        }
    });

    const { register: experienceRegister, handleSubmit: handleExperienceSubmit, formState: { errors: experienceErrors }, watch: watchExperience, reset: resetExperience } = useForm({
        resolver: yupResolver(experienceSchema),
        defaultValues: {
            title: '',
            company: '',
            started_at: '',
            ended_at: '',
            is_present: false,
        }
    });

    const { register: educationRegister, handleSubmit: handleEducationSubmit, formState: { errors: educationErrors }, watch: watchEducation, reset: resetEducation } = useForm({
        resolver: yupResolver(educationSchema),
        defaultValues: {
            degree: '',
            institution: '',
            started_at: '',
            ended_at: '',
            is_present: false,
        }
    });

    const { submit: submitAbout, isSubmitting: isAboutSubmitting } = useApiForm<any, { success: boolean, user: any, profile: any }>({
        onSuccess: (data: { success: boolean; user: any; profile: any }) => {
            if (data.success) {
                updateUser(data.user);
                console.log(data.profile)
                setProfile(data.profile);
                setIsAboutModalOpen(false);
            }
        },
        successMessage: 'About section updated successfully!',
        errorMessage: 'Failed to update about section.',
    });
    const onAboutSubmit = (data: { about: string }) => submitAbout('/profile/update', data);

    const { submit: submitSkills, isSubmitting: isSkillsSubmitting } = useApiForm<any, { success: boolean, user: any; profile: any }>({
        onSuccess: (data: { success: boolean; user: any; profile: any }) => {
            if (data.success) {
                updateUser(data.user);
                setProfile(data.profile);
                setIsSkillsModalOpen(false);
            }
        },
        successMessage: 'Skills updated successfully!',
        errorMessage: 'Failed to update skills.',
    });
    const onSkillsSubmit = (data: { skills?: string[] | undefined }) => submitSkills('/profile/update', data);

    const { submit: submitPortfolio, isSubmitting: isPortfolioSubmitting } = useApiForm<FormData, { success: boolean; portfolio: any[] }>({
        onSuccess: (data: { success: boolean; portfolio: any[]; }) => {
            if (data.success) {
                setPortfolios(data.portfolio);
                setEditingPortfolio(null);
                setIsPortfolioModalOpen(false);
                resetPortfolio();
            }
        },
        successMessage: `Portfolio item ${editingPortfolio ? 'updated' : 'added'} successfully!`,
        errorMessage: `Failed to ${editingPortfolio ? 'update' : 'add'} portfolio item.`,
    });

    const onPortfolioSubmit = async (data: yup.InferType<typeof portfolioSchema>) => {
        const url = editingPortfolio ? `/profile/portfolio/${editingPortfolio.id}` : '/profile/portfolio';
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image) formData.append('image', data.image);
        await submitPortfolio(url, formData, editingPortfolio ? 'PUT' : 'POST');
    };

    const { submit: deletePortfolio, isSubmitting: isDeletingPortfolio } = useApiForm<any, { success: boolean, portfolio: any[] }>({
        onSuccess: (data: { success: boolean; portfolio: any[]; }) => data.success && setPortfolios(data.portfolio),
        successMessage: 'Portfolio item deleted.',
        errorMessage: 'Failed to delete portfolio item.',
    });
    const onPortfolioDelete = (id: number) => {
        setDeleteConfirmation({
            isOpen: true,
            isLoading: isDeletingPortfolio,
            onConfirm: () => deletePortfolio(`/profile/portfolio/${id}`, {}, 'DELETE'),
            title: 'Delete Portfolio Item',
            message: 'Are you sure you want to delete this portfolio item? This action cannot be undone.',
        });
    };

    const { submit: submitExperience, isSubmitting: isExperienceSubmitting } = useApiForm<any, { success: boolean, result: { experience: any[] } }>({
        onSuccess: (data: { success: boolean; result: { experience: any[]; }; }) => {
            if (data.success) {
                setExperiences(data.result.experience);
                setIsExperienceModalOpen(false);
                resetExperience();
            }
        },
        successMessage: 'Work experience added successfully!',
        errorMessage: 'Failed to add work experience.',
    });
    const onExperienceSubmit = (data: yup.InferType<typeof experienceSchema>) => submitExperience('/profile/pro-details', { ...data, type: 'experience' });

    const { submit: deleteExperience, isSubmitting: isDeletingExperience } = useApiForm<any, { success: boolean, result: { experiences: any[] } }>({
        onSuccess: (data: { success: boolean; result: { experiences: any[]; }; }) => data.success && setExperiences(data.result.experiences),
        successMessage: 'Work experience deleted.',
        errorMessage: 'Failed to delete work experience.',
    });
    const onExperienceDelete = (id: number) => {
        setDeleteConfirmation({
            isOpen: true,
            isLoading: isDeletingExperience,
            onConfirm: () => deleteExperience(`/profile/pro-details/${id}`, {}, 'DELETE'),
            title: 'Delete Work Experience',
            message: 'Are you sure you want to delete this work experience? This action cannot be undone.',
        });
    };

    const { submit: submitEducation, isSubmitting: isEducationSubmitting } = useApiForm<any, { success: boolean, result: { education: any[] } }>({
        onSuccess: (data: { success: boolean; result: { education: any[]; }; }) => {
            if (data.success) {
                setEducation(data.result.education);
                setEditingEducation(null);
                setIsEducationModalOpen(false);
                resetEducation();
            }
        },
        successMessage: `Education ${editingEducation ? 'updated' : 'added'} successfully!`,
        errorMessage: 'Failed to add education.',
    });
    const onEducationSubmit = (data: yup.InferType<typeof educationSchema>) => {
        const url = editingEducation ? `/profile/pro-details/${editingEducation.id}` : '/profile/pro-details';
        submitEducation(url, { ...data, type: 'education' }, editingEducation ? 'PUT' : 'POST');
    };

    const { submit: deleteEducation, isSubmitting: isDeletingEducation } = useApiForm<any, { success: boolean, result: { education: any[] } }>({
        onSuccess: (data: { success: boolean; result: { education: any[]; }; }) => data.success && setEducation(data.result.education),
        successMessage: 'Education entry deleted.',
        errorMessage: 'Failed to delete education entry.',
    });
    const onEducationDelete = (id: number) => {
        setDeleteConfirmation({
            isOpen: true,
            isLoading: isDeletingEducation,
            onConfirm: () => deleteEducation(`/profile/pro-details/${id}`, {}, 'DELETE'),
            title: 'Delete Education Entry',
            message: 'Are you sure you want to delete this education entry? This action cannot be undone.',
        });
    };

    const { submit: submitProfile, isSubmitting: isProfileSubmitting } = useApiForm<any, { success: boolean, user: any; profile: any }>({
        onSuccess: (data: { success: boolean; user: any; profile: any }) => {
            if (data.success) {
                updateUser(data.user);
                setProfile(data.profile);
                setIsEditProfileOpen(false);
            }
        },
        successMessage: 'Profile updated successfully!',
        errorMessage: 'Failed to update profile.',
    });
    const onProfileSubmit = (data: any) => submitProfile('/profile/update', data);

    const onUpload = () => {
        if (inputRef.current) {
            setImage(null);
            setOpenCropper(true);
            inputRef.current.click();
        }
    };

    const handleCancelCrop = () => {
        setImage(null);
        setOpenCropper(false);
    };

    const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files?.[0]) {
            const blob = URL.createObjectURL(files[0]);
            setImage({
                src: blob,
                type: files[0].type
            });
        }
        event.target.value = '';
    };

    const handleCrop = async () => {
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            setOpenCropper(false);
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const croppedFile = new File([blob], 'avatar_image.jpg', {
                        type: blob.type,
                        lastModified: Date.now()
                    });

                    const formData = new FormData();
                    formData.append('profile_picture', croppedFile);

                    try {
                        const res = await post<any, { success: boolean, user: any }>('/profile/dp', formData, true);
                        if (res.data.success) {
                            updateUser(res.data.user);
                            alert('Profile picture updated successfully!', 5000, 'success');
                            setFile(croppedFile); // Update UI with new image
                        }
                    } catch (error) {
                        alert('Failed to update profile picture.', 5000, 'error');
                        console.error('Error uploading profile picture:', error);
                    }
                }
            }, 'image/jpeg');
        }
    };
    if (loaderData?.user?.role === 'business') return <BusinessProfile loaderData={loaderData} />
    return (
        <div className="w-full flex flex-col gap-4">
            <Modal
                isOpen={deleteConfirmation.isOpen}
                onClose={() => setDeleteConfirmation({ ...deleteConfirmation, isOpen: false })}
                title={deleteConfirmation.title}
            >
                <div className="space-y-6">
                    <p className="text-sm text-gray-600 dark:text-neutral-300">{deleteConfirmation.message}</p>
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={() => setDeleteConfirmation({ ...deleteConfirmation, isOpen: false })}>
                            Cancel
                        </Button>
                        <Button isLoading={isDeletingPortfolio || isDeletingExperience || isDeletingEducation} className="bg-red-600 hover:bg-red-700 from-red-600 to-red-700" onClick={() => {
                            deleteConfirmation.onConfirm?.();
                            setDeleteConfirmation({ isOpen: false, onConfirm: null, title: '', message: '', isLoading: false });
                        }}>Delete</Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title="Edit Profile" desc="Update your personal information, professional headline, and address.">
                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4 w-full">
                    {/* <div className="flex flex-col gap-1.5">
                        <p className="text-[#0F1729] dark:text-neutral-300 text-sm">Profile Picture</p>
                        <button type="button" onClick={onUpload} className="relative overflow-hidden h-24 w-24 rounded-2xl bg-[#F1F5F9] dark:bg-neutral-700 border-2 border-[#64748B] dark:border-neutral-600 flex justify-center items-center">
                            {file ? <img src={URL.createObjectURL(file)} alt="avatar" className="absolute z-0 inset-0 w-full h-full object-cover" /> : profile?.dp && <img src={loaderData.profile.dp} alt="avatar" className="absolute z-0 inset-0 w-full h-full object-cover" />}
                            <LuUpload className="relative z-10 text-[#64748B] dark:text-neutral-400" size={24} />
                        </button>
                        <input ref={inputRef} accept="image/*" onChange={onLoadImage} type="file" className="hidden" />
                    </div> */}
                    <Input {...profileRegister('professional_headline')} error={profileErrors.professional_headline?.message as string} label="Professional Headline" placeholder="e.g., Senior Software Engineer" />
                    <Input {...profileRegister('address')} error={profileErrors.address?.message as string} label="Location" placeholder="e.g., Lagos, Nigeria" />
                    <Button type="submit" className="w-full" isLoading={isProfileSubmitting}>Save Changes</Button>
                </form>
            </Modal>
            <div className="flex gap-2 items-center">
                <div className="flex-1 h-3 md:h-4.5 flex items-center">
                    <div className="h-full bg-[#FF8500] rounded-full md:h-3.5" style={{ width: `${loaderData?.percentage_completed}%` }}></div>
                </div>
                <p className="text-[#0F1729] dark:text-neutral-300 font-medium leading-6">{loaderData?.percentage_completed}% Complete</p>
            </div>
            <div className="w-full rounded-lg py-3 px-6 bg-white dark:bg-neutral-700 flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex gap-8">
                        <button onClick={onUpload} className="w-[92px] h-[92px] rounded-full relative group">
                            <img src={file ? URL.createObjectURL(file) : (profile?.dp ?? "/images/avatar.png")} alt="" className="size-[92px] rounded-full border-2 border-[#0D6EFD] object-cover" />
                            {/* {file ? <img src={URL.createObjectURL(file)} alt="avatar" className="absolute z-0 inset-0 w-full h-full object-cover" /> : profile?.dp && <img src={profile.dp} alt="avatar" className="absolute z-0 inset-0 w-full h-full object-cover" />} */}
                            <div className="absolute z-0 w-6 h-6 rounded-full flex justify-center items-center bottom-2 right-0 bg-white dark:bg-neutral-500">
                                <LuPencilLine color="#0D6EFD" strokeWidth={2} />
                            </div>
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <LuCamera size={32} className="text-white" />
                            </div>
                        </button>
                        <input ref={inputRef} accept="image/*" onChange={onLoadImage} type="file" className="hidden" />
                        <section className=" flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-[#020817] dark:text-neutral-300 text-2xl font-semibold">{loaderData?.user?.full_name}</h2>
                                <p className="leading-6 text-[#64748B] dark:text-neutral-400">{profile?.professional_headline ?? 'No Professional Headline'}</p>
                                <p className="text-sm leading-6 text-[#64748B] dark:text-neutral-400 inline-flex items-center gap-1 capitalize">
                                    <LuMapPin className="text-[#64748B] dark:text-neutral-400" />
                                    {profile?.address ?? 'No address'}</p>
                            </div>

                            <Button onClick={() => setIsEditProfileOpen(true)} className="py-1 w-fit">Edit Profile</Button>
                        </section>
                    </div>
                    {/* <button onClick={() => setIsEditProfileOpen(true)} className="flex h-fit py-2.5 px-4 justify-center items-center gap-2.5 rounded-md border dark:border-neutral-500 border-[#E2E8F0]">
                        <LuPencilLine /> Edit
                    </button> */}
                </div>
                <div className="flex gap-4">
                    <div className="flex w-1/3 md:max-w-[236px] gap-1 flex-col p-3 rounded-md bg-[#F9F9F9] dark:bg-neutral-600">
                        <div className="flex items-center gap-3">
                            <p className="text-primary text-lg leading-7">0</p>
                            <p className="text-xs leading-5  dark:text-neutral-400">/hr</p>
                        </div>
                        <p className="text-sm leading-5 text-[#6B7280] dark:text-neutral-400">Hourly Rate</p>
                    </div>
                    <div className="flex w-1/3 md:max-w-[236px] gap-1 flex-col p-3 rounded-md bg-[#F9F9F9] dark:bg-neutral-600">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1 items-center">
                                <LuStar color="#EAB308" />
                                <p className="text-lg leading-7">0</p>
                            </div>

                            <p className="text-xs leading-5  dark:text-neutral-400">/5</p>
                        </div>
                        <p className="text-sm leading-5 text-[#6B7280] dark:text-neutral-400">Rating</p>
                    </div>
                    <div className="flex w-1/3 md:max-w-[236px] gap-1 flex-col p-3 rounded-md bg-[#F9F9F9] dark:bg-neutral-600">
                        <div className="flex gap-1 items-center">
                            <LuCircleCheckBig color="#0D6EFD" />
                            <p className="text-lg leading-7">0</p>
                        </div>
                        <p className="text-sm leading-5 text-[#6B7280] dark:text-neutral-400">job Success</p>
                    </div>
                </div>
            </div>
            <section className="p-6 shadow-sm rounded-lg border-[#E2E8F0] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="w-full flex p-[25px] items-start justify-between gap-6">
                    <div className="flex gap-1 flex-col">
                        <p className="leading-[24px] text-[22px] font-medium tracking-[0px]">Your Availability</p>
                        {!profile?.availability && <p className="self-stretch text-[#64748B] dark:text-neutral-300 text-sm">Set up your availability to let employers hire you</p>}
                        {profile?.availability && <p className="self-stretch text-[#64748B] dark:text-neutral-300 text-sm">You're available for 20 hours this week</p>}
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Update My Availability</button>
                    <AvailabilityModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} availability={profile?.availability} onSuccess={profile => setProfile(profile)} />
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {Object.entries(profile?.availability ?? {})?.map((entry) => (
                        <div key={entry[0]} className="flex flex-col gap-2">
                            <div key={entry[0]} className="font-medium text-[#374151] dark:text-neutral-300">
                                {entry[0]}
                            </div>
                            {entry[1].map(value => (
                                <div key={`${value}-morning`} className="bg-[#dcf6fc] dark:bg-neutral-500 rounded p-2 text-xs text-[#1f2937] dark:text-neutral-200">
                                    {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
            {openCropper && <Portal open={openCropper}>
                {image && <div className="w-full relative h-full flex items-center flex-col">
                    <Cropper ref={cropperRef} className="cropper max-h-screen w-full md:w-auto" stencilProps={{
                        aspectRatio: 1,
                        movable: true,
                        resizable: true
                    }} src={image?.src} />
                    <div className="md:absolute md:top-0 bottom-0 left-0 flex items-start mt-4 gap-2">
                        <Button variant="outline" type="button" className="rounded-full" onClick={handleCancelCrop}>
                            Cancel
                        </Button>
                        <Button type="button" className="rounded-full" onClick={handleCrop}>
                            Done
                        </Button>
                    </div>
                </div>}
                {!image && <div className="w-full py-12 h-screen flex justify-center items-center flex-col gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-y-transparent border-x-primary-500 animate-spin"></div>
                    <Button variant="outline" type="button" className="rounded-full" onClick={handleCancelCrop}>Cancel</Button>
                </div>}
            </Portal>}
            <section className="rounded-lg p-6 space-y-6 shadow-sm  border-[#E2E8F0] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="w-full flex items-start justify-between gap-6">
                    <h3 className="leading-[24px] text-[22px] font-medium tracking-[0px]">About</h3>
                    <button onClick={() => setIsAboutModalOpen(true)} className="flex items-center gap-1 text-primary">
                        {profile?.about ? 'Edit' : 'Add'} About
                        <LuArrowRight size={24} />
                    </button>
                </div>
                <p className="text-[#64748b] dark:text-neutral-300 mb-3">
                    {profile?.about || "You have not added an about section yet."}
                </p>
                <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="About" desc="Tell potential employers about your background, experience, and what makes you a great candidate.">
                    <form onSubmit={handleAboutSubmit(onAboutSubmit)} className="space-y-4 w-full">
                        <Textarea {...aboutRegister('about')} error={aboutErrors.about?.message as string} label="About" placeholder="Tell us about yourself" rows={5} className="w-full" />
                        <Button type="submit" className="w-full" isLoading={isAboutSubmitting}>Save</Button>
                    </form>
                </Modal>
            </section>
            <section className="p-6 space-y-6 shadow-sm rounded-lg border-[#E2E8F0] border dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="w-full flex items-start justify-between gap-6">
                    <h3 className="leading-[24px] text-[22px] font-medium tracking-[0px]">Skill & Expertise</h3>
                    <button onClick={() => setIsSkillsModalOpen(true)} className="flex items-center gap-1 text-primary">
                        {(profile?.skills?.length ?? 0) > 0 ? 'Edit Skills' : 'Add Skills'}
                        <LuArrowRight size={24} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {profile?.skills?.length === 0 && (
                        <p className="text-[#64748b] dark:text-neutral-400">You have not added any skills yet.</p>
                    )}
                    {profile?.skills?.map((skill: string) => (
                        <div
                            key={skill}
                            className="bg-[#f2f7ff] px-3 rounded-full text-[#3b82f6] dark:text-neutral-200 text-sm dark:bg-neutral-600 border border-[#e2e8f0] dark:border-neutral-500 flex items-center"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
                <Modal isOpen={isSkillsModalOpen} onClose={() => setIsSkillsModalOpen(false)} title="Skills & Expertise" desc="List your skills and areas of expertise to help employers find you for relevant roles.">
                    <form onSubmit={handleSkillsSubmit(onSkillsSubmit)} className="space-y-4 w-full">
                        <Skills label="Skills" value={watchSkills('skills')} onSave={(e) => setSkillsValue('skills', e)} placeholder="Add skills and press enter" className="w-full" />
                        {skillsErrors.skills && <p className="text-sm text-red-500">{skillsErrors.skills.message}</p>}
                        <Button type="submit" className="w-full" isLoading={isSkillsSubmitting}>Save Skills</Button>
                    </form>
                </Modal>
            </section>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuUser size={20} />
                        <h3 className="leading-[24px] text-[22px] font-medium tracking-[0px]">Portfolio</h3>
                    </div>
                    <button onClick={() => setIsPortfolioModalOpen(true)} className="flex items-center gap-1 text-primary">
                        {(loaderData?.portfolio?.length ?? 0) > 0 ? 'Manage Portfolio' : 'Add Portfolio'}
                        <LuArrowRight size={24} />
                    </button>
                </div>
                {portfolios.length === 0 && <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuUser size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">No Portfolio Items yet</p>
                        </div>
                        <button onClick={() => setIsPortfolioModalOpen(true)} className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Portfolio</button>
                    </div>
                </div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolios.map(value => <PortfolioCard
                        key={value.id}
                        title={value.title}
                        description={value.description}
                        imageUrl={`${import.meta.env.VITE_BASE_SERVICE_URL}${value.path}`}
                        onEdit={() => {
                            setEditingPortfolio(value);
                            setPortfolioValue('title', value.title);
                            setPortfolioValue('description', value.description);
                            setIsPortfolioModalOpen(true);
                        }}
                        onDelete={() => onPortfolioDelete(value.id)}
                    />)}
                </div>
                <Modal isOpen={isPortfolioModalOpen} onClose={() => { setIsPortfolioModalOpen(false); resetPortfolio(); setEditingPortfolio(null); }} title={editingPortfolio ? "Edit Portfolio Item" : "Add Portfolio Item"} desc="Showcase your best work by adding projects to your portfolio. Include a title, description, and an image.">
                    <form onSubmit={handlePortfolioSubmit(onPortfolioSubmit)} className="space-y-4 w-full">
                        <Input {...portfolioRegister('title')} error={portfolioErrors.title?.message} label="Project Title" placeholder="Enter project title" className="w-full" />
                        <Textarea {...portfolioRegister('description')} error={portfolioErrors.description?.message} label="Project Description" placeholder="Enter project description" className="w-full" />
                        <div>
                            <label className="block text-sm font-medium text-[#0F1729] dark:text-neutral-300 mb-1">Project Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files?.[0]) setPortfolioValue('image', e.target.files[0]);
                                }}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-primary hover:file:bg-violet-100" />
                            {portfolioErrors.image && <p className="text-sm text-red-500 mt-1">{portfolioErrors.image.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" isLoading={isPortfolioSubmitting}>{editingPortfolio ? 'Save Changes' : 'Add Project'}</Button>
                    </form>
                </Modal>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuBriefcase size={20} />
                        <h3 className="leading-[24px] text-[22px] font-medium tracking-[0px]">Work Experience</h3>
                    </div>
                    <button onClick={() => setIsExperienceModalOpen(true)} className="flex items-center gap-1 text-primary">
                        Add Experience
                        <LuArrowRight size={24} />
                    </button>
                </div>
                {experiences.length === 0 && <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuBriefcase size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">No work experience added yet</p>
                        </div>
                        <button onClick={() => setIsExperienceModalOpen(true)} className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Work Experience</button>
                    </div>
                </div>}

                <div className="space-y-6">
                    {experiences.map((exp, index) => <ExperienceCard
                        key={exp.id}
                        title={exp.title}
                        company={exp.company}
                        period={`${(exp.started_at)} - ${exp.ended_at ?? 'Present'}`}
                        onEdit={() => { setEditingExperience(exp); setIsExperienceModalOpen(true); }}
                        onDelete={() => onExperienceDelete(exp.id)}
                    // description={exp.description}
                    />)}
                </div>
                <Modal isOpen={isExperienceModalOpen} onClose={() => { setIsExperienceModalOpen(false); resetExperience(); }} title="Add Work Experience" desc="Detail your professional history to give employers a clear picture of your experience.">
                    <form onSubmit={handleExperienceSubmit(onExperienceSubmit)} className="space-y-4 w-full">
                        <Input {...experienceRegister('title')} error={experienceErrors.title?.message} label="Job Title" placeholder="e.g. Software Engineer" className="w-full" />
                        <Input {...experienceRegister('company')} error={experienceErrors.company?.message} label="Company" placeholder="e.g. Google" className="w-full" />
                        <label className="flex items-center gap-2 text-sm text-[#0F1729] dark:text-neutral-300">
                            <input {...experienceRegister('is_present')} type="checkbox" />
                            I am currently working in this role
                        </label>
                        <Input {...experienceRegister('started_at')} error={experienceErrors.started_at?.message} label="Start Date" type="date" />
                        <Input {...experienceRegister('ended_at')} disabled={watchExperience('is_present')} error={experienceErrors.ended_at?.message} label="End Date" type="date" />
                        <Button type="submit" className="w-full" isLoading={isExperienceSubmitting}><LuPlus /> Add Experience</Button>
                    </form>
                </Modal>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuBriefcase size={20} />
                        <h3 className="leading-[24px] text-[22px] font-medium tracking-[0px]">Current Work</h3>
                    </div>
                    <Link to="/apply" className="flex items-center gap-1 text-primary">
                        Apply for slots
                    </Link>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuBriefcase size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">You have not received any role yet</p>
                        </div>
                        <Link to="/apply" className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Apply for slots</Link>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col p-[25px] gap-6 rounded-lg border border-[#E2E8F0] dark:border-neutral-500 bg-white dark:bg-neutral-700">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <LuGraduationCap size={20} />
                        <h3 className="leading-[24px] text-[22px] font-medium tracking-[0px]">Education</h3>
                    </div>

                    <button onClick={() => setIsEducationModalOpen(true)} className="flex items-center gap-1 text-primary">
                        Add Education
                        <LuArrowRight size={24} />
                    </button>
                </div>
                {education.length === 0 && <div className="w-full flex justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <LuGraduationCap size={40} className="text-[#D1D5DB] dark:text-neutral-500" />
                            <p className="self-stretch text-[#6B7280] dark:text-neutral-400 text-center">You’ve not added any educational qualifications</p>
                        </div>
                        <button onClick={() => setIsEducationModalOpen(true)} className="flex p-2.5 justify-center items-center gap-2.5 rounded-md border border-[#E2E8F0] dark:border-neutral-500">Add Education</button>
                    </div>
                </div>}

                <div className="space-y-6">
                    {education.map((exp, index) => <EducationCard
                        key={exp.id}
                        title={exp.degree}
                        institution={exp.institution}
                        period={`${(exp.started_at)} - ${exp.ended_at}`}
                        onEdit={() => { setEditingEducation(exp); setIsEducationModalOpen(true); }}
                        onDelete={() => onEducationDelete(exp.id)}
                    // description={exp.description}
                    />)}
                </div>
                <Modal isOpen={isEducationModalOpen} onClose={() => { setIsEducationModalOpen(false); resetEducation(); }} title="Add Education" desc="List your educational qualifications to provide a complete picture of your background.">
                    <form onSubmit={handleEducationSubmit(onEducationSubmit)} className="space-y-4 w-full">
                        <Input {...educationRegister('degree')} error={educationErrors.degree?.message} label="Degree" placeholder="e.g. B.Sc. Computer Science" className="w-full" />
                        <Input {...educationRegister('institution')} error={educationErrors.institution?.message} label="Institution" placeholder="e.g. University of Example" className="w-full" />
                        <label className="flex items-center gap-2 text-sm text-[#0F1729] dark:text-neutral-300">
                            <input {...educationRegister('is_present')} type="checkbox" />
                            I am currently studying here
                        </label>
                        <Input {...educationRegister('started_at')} error={educationErrors.started_at?.message} label="Start Date" type="date" />
                        <Input {...educationRegister('ended_at')} disabled={watchEducation('is_present')} error={educationErrors.ended_at?.message} label="End Date" type="date" />
                        <Button type="submit" className="w-full" isLoading={isEducationSubmitting}><LuPlus /> Add Education</Button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}
interface Experience {
    description?: string;
    title: string;
    company: string;
    period: string;
    status?: string;
    onEdit: () => void;
    onDelete: () => void;
}
function ExperienceCard({ title, company, period, description, onEdit, onDelete }: Readonly<Experience>) {
    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[#0f1729] dark:text-neutral-200">{title}</h3>
                <div className="flex items-center text-sm text-[#64748b] dark:text-neutral-400 gap-4">
                    <div className="flex items-center gap-1">
                        <LuCalendar className="h-4 w-4" />
                        <span>{period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onEdit}><LuPencilLine size={16} className="cursor-pointer hover:text-primary" /></button>
                        <button onClick={onDelete}><LuTrash2 size={16} className="cursor-pointer hover:text-red-500" /></button>
                    </div>
                </div>
            </div>
            <div className="text-sm text-[#64748b] dark:text-neutral-400 mb-2">
                <LuBuilding className="h-3 w-3 inline mr-1" />
                {company}
            </div>
            <p className="text-sm text-[#64748b] dark:text-neutral-400">{description}</p>
        </div>
    )
}


function CurrentWorkCard({ title, company, period, description, status }: Readonly<Experience>) {
    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[#0f1729]">{title}</h3>
                {status === "In Progress" ? (
                    <div className="bg-[#f2f7ff] px-2.5 rounded-full text-[#3b82f6] hover:bg-[#e2e8f0] border border-[#e2e8f0]">
                        In Progress</div>
                ) : (
                    <span className="text-sm text-[#64748b]">Completed</span>
                )}
            </div>
            <div className="flex items-center text-sm text-[#64748b] mb-1">
                <LuBuilding className="h-3 w-3 mr-1" />
                {company}
            </div>
            <div className="flex items-center text-sm text-[#64748b] mb-2">
                <LuCalendar className="h-3 w-3 mr-1" />
                <span>{period}</span>
            </div>
            <p className="text-sm text-[#64748b]">{description}</p>
        </div>
    )
}
type Education = {
    title: string;
    institution: string;
    period: string;
    onEdit: () => void;
    onDelete: () => void;
}
function EducationCard({ title, institution, period, onEdit, onDelete }: Readonly<Education>) {
    return (
        <div className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-[#0f1729] dark:text-neutral-200">{title}</h3>
                <div className="flex items-center text-sm text-[#64748b] dark:text-neutral-400 gap-4">
                    <div className="flex items-center gap-1">
                        <LuCalendar className="h-4 w-4" />
                        <span>{period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onEdit}><LuPencilLine size={16} className="cursor-pointer hover:text-primary" /></button>
                        <button onClick={onDelete}><LuTrash2 size={16} className="cursor-pointer hover:text-red-500" /></button>
                    </div>
                </div>
            </div>
            <div className="text-sm text-[#64748b] dark:text-neutral-400">{institution}</div>
        </div>
    )
}
type Portfolio = {
    title: string;
    description: string;
    imageUrl: string;
    onEdit: () => void;
    onDelete: () => void;
}
function PortfolioCard({ title, description, imageUrl, onEdit, onDelete }: Readonly<Portfolio>) {
    return (
        <div className="border dark:border-neutral-500 rounded-lg overflow-hidden">
            <div className="relative h-40">
                <img src={imageUrl || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#0f1729]">{title}</h3>
                    <div className="flex items-center gap-3">
                        <button onClick={onEdit}>
                            <LuPencilLine size={16} className="cursor-pointer hover:text-primary" />
                        </button>
                        <button onClick={onDelete}>
                            <LuTrash2 size={16} className="cursor-pointer hover:text-red-500" />
                        </button>
                    </div>
                </div>
                <p className="text-sm text-[#64748b]">{description}</p>
            </div>
        </div>
    )
}

export default Profile
