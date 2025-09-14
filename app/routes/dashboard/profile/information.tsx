import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { LuUpload } from 'react-icons/lu'
import Input from '~/components/dashboard/input'
import Button from '~/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useNavigate } from 'react-router'
import { post } from '~/libs/axios'
import { useForm } from 'react-hook-form'
import { type CropperRef, Cropper } from 'react-advanced-cropper';
import Portal from '~/components/dashboard/portal'
import 'react-advanced-cropper/dist/style.css'
import useAuth from '~/stores/authStore'
import Textarea from '~/components/dashboard/textarea'

interface FormErrors {
    [key: string]: string | undefined;
}

type Inputs = {
    professional_headline: string,
    about: string
    location: string,
}
interface Image {
    type?: string;
    src: string;
}
const schema = yup
    .object({
        // profile_picture: yup.string().required(),
        professional_headline: yup.string().required(),
        about: yup.string().required(),
        location: yup.string().required()
        // phone_number: yup.string().matches(/^0\d{10}$/, {
        //     message: "phone number must be numbers of 11 characters"
        // }).length(11).required(),
    })
    .required()
const Information = () => {
    const navigate = useNavigate()
    const { updateStep, step} = useAuth();
    console.log(step)
    const [file, setFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<Image | null>(null);
    const cropperRef = useRef<CropperRef>(null);
    const [openCropper, setOpenCropper] = useState(false);
    const { formState: { errors }, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            about: '',
            professional_headline: '',
            location: ''
        }
    });
    const [sErrors, setSErrors] = useState<FormErrors>({
        about: undefined,
        professional_headline: undefined,
        profile_picture: undefined,
    });
    const onUpload = () => {
        if (inputRef.current) {
            setImage(null)
            setOpenCropper(true)
            inputRef.current.click();
        }
    };
    // console.log(import.meta.env.VITE_BASE_SERVICE_URL + profile.display_picture)
    const handleCancel = () => {
        setImage(null)
        setOpenCropper(false)
    }

    const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
        // Reference to the DOM input element        
        const { files } = event.target;
        // Ensure that you have a file before attempting to read it        
        if (files?.[0]) {
            // Create the blob link to the file to optimize performance:            
            const blob = URL.createObjectURL(files[0]);
            console.log(blob)
            // Get the image type from the extension. It's the simplest way, though be careful it can lead to an incorrect result:            
            setImage({
                src: blob,
                type: files[0].type
            })
        }
        // Clear the event target value to give the possibility to upload the same image:        
        event.target.value = '';
    };

    const upload = async () => {
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            setOpenCropper(false)
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const file = new File([blob], 'avatar_image.jpg', {
                        type: blob.type,
                        lastModified: Date.now()
                    })
                    setFile(file);
                }
            }, 'image/jpeg');
        }

    }
    const [imageSrc, setImageSrc] = useState<string | undefined>('');
    const onChange = (cropper: CropperRef) => {
        const img = cropper.getCanvas()?.toDataURL()
        setImageSrc(img)
    }
    useEffect(() => {
        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file        
        return () => {
            if (image?.src) {
                URL.revokeObjectURL(image.src);
            }
        };
    }, [image]);

    const onSubmit = async (form: Inputs) => {
        if (!file) {
            setSErrors(pv => ({ ...pv, profile_picture: 'Please add a profile picture to continue' }))
            return;
        }
        const formData = new FormData();
        formData.append('about', form.about);
        formData.append('address', form.location);
        formData.append('professional_headline', form.professional_headline);
        formData.append(`profile_picture`, file);

        try {
            await post<FormData, {success:boolean; step: number}>('profile/core-information', formData, true)
            .then(res=>{
                const {success, step} = res.data;
                if(success){
                    updateStep(step)
                    navigate('/dashboard/complete-profile/availability');
                }
            } )
        } catch (error) {
            console.error('Error:', error);
            setSErrors((prev) => ({
                ...prev,
                // document: 'An error occurred while submitting the form. Please try again.',
            }));
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 max-w-2xl">
                <h2 className="text-2xl font-bold leading-6 text-[#0F1729] dark:text-neutral-300">Tell us about yourself</h2>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[#0F1729] dark:text-neutral-300 text-sm">Profile Picture</p>
                    <div className="flex gap-4">
                        <button type="button" onClick={onUpload} className="relative overflow-hidden h-24 w-24 rounded-2xl bg-[#F1F5F9] dark:bg-neutral-700 border-2 border-[#64748B] dark:border-neutral-600 flex justify-center items-center">
                            {imageSrc && <img src={imageSrc} alt="avatar" className="absolute z-0 inset-0" />}
                            <LuUpload className="relative z-10 text-[#64748B] dark:text-neutral-400" size={24} />
                        </button>
                        <div className="flex flex-col justify-center">
                            <p className="text-[#0F1729] dark:text-neutral-300 text-sm font-medium">Upload a Profile photo</p>
                            <span className="text-[#64748B] dark:text-neutral-400 text-sm">Profiles with a photo are 2x more likely to get viewed.</span>
                        </div>
                        <input ref={inputRef} accept="image/*" onChange={onLoadImage} type="file" className="hidden" />
                    </div>
                    {sErrors.profile_picture && <span className="text-sm text-red-500">{sErrors.profile_picture}</span>}
                </div>
                <Input {...register('professional_headline')} error={sErrors.professional_headline ?? errors?.professional_headline?.message} label="Professional Headline" placeholder="Eg: Product Designer and No-code Developer" info="This will be displayed on your profile and in search results." />
                <Input {...register('about')} error={sErrors.about ?? errors?.about?.message} label="About" placeholder="Something you wont Employers to see about you" />
                <Textarea {...register('location')} error={sErrors.location ?? errors?.location?.message} label="Address" placeholder="No 34 Panaf Drive Wuse Zone 1, Abuja, Nigeria" />

                {openCropper && <Portal open={openCropper}>
                    {image && <div className="w-full relative h-full flex items-center flex-col">
                        <Cropper onChange={onChange} ref={cropperRef} className="cropper max-h-screen w-full md:w-auto" stencilProps={{
                            aspectRatio: 1,
                            movable: true,
                            resizable: true
                        }} src={image?.src} />
                        <div className="md:absolute md:top-0 bottom-0 left-0 flex items-start mt-4 gap-2">
                            <Button variant="outline" type="button" className="rounded-full" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="button" className="rounded-full" onClick={upload}>
                                Done
                            </Button>
                        </div>
                    </div>}
                    {!image && <div className="w-full py-12 h-screen flex justify-center items-center flex-col gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-y-transparent border-x-primary-500 animate-spin"></div>
                        <Button variant="outline" type="button" className="rounded-full" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>}
                </Portal>}
            </div>
            <Button className="self-end">Next: Set Your Availability</Button>
        </form>
    )
}

export default Information