// This code defines a React functional component named `ProfileMedia` that is part of an employer profile onboarding process.

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { LuBuilding2, LuImage, LuUpload } from "react-icons/lu";
import Button from "~/components/ui/button";
import useEmployerOnboardingStore from "~/stores/employerOnboardingStore";
import { useLoader } from "~/stores/loaderStore"
import Input from "../dashboard/input";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { Cropper, type CropperRef } from "react-advanced-cropper";
import Portal from "../dashboard/portal";
import 'react-advanced-cropper/dist/style.css'

interface ProfileMediaProps {
  setPage: (page: number) => void;
}

interface Image {
  type?: string;
  src: string;
}

type Inputs = {
  linkedIn?: string,
  github?: string,
  twitter?: string,
  other?: string,
}
const schema = yup
  .object({
    linkedIn: yup.string().optional(),
    github: yup.string().optional(),
    twitter: yup.string().optional(),
    other: yup.string().optional(),
  })
  .required()

const ProfileMedia: React.FC<ProfileMediaProps> = ({ setPage }) => {
  const { updateMedia, updateSocial, media, social } = useEmployerOnboardingStore();
  const { alert } = useLoader();

  const [logoFile, setLogoFile] = useState<File | null>(media?.profile_picture ?? null);
  const [coverFile, setCoverFile] = useState<File | null>(media?.cover_photo ?? null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const cropperRef = useRef<CropperRef>(null);
  const [openCropper, setOpenCropper] = useState(false);

  const { formState: { errors }, register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      linkedIn: social?.linkedIn ?? '',
      github: social?.github ?? '',
      twitter: social?.twitter ?? '',
      other: social?.other ?? '',
    }
  });
  const [image, setImage] = useState<Image | null>(null);
  const [type, setType] = useState<'logo' | 'cover'>('logo');
  const onUpload = (type: 'logo' | 'cover') => {
    setType(type)
    setImage(null)
    if (type === 'logo') {
      logoInputRef.current?.click()
    } else {
      setOpenCropper(true)
      coverInputRef.current?.click()
    }
  };
  const handleCancel = () => {
    setImage(null)
    setOpenCropper(false)
  }
  useEffect(() => {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file        
    return () => {
      if (image?.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);
  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    // Reference to the DOM input element        
    const { files } = event.target;
    // Ensure that you have a file before attempting to read it        
    if (files?.[0]) {
      // Create the blob link to the file to optimize performance:            
      const blob = URL.createObjectURL(files[0]);
      // Get the image type from the extension. It's the simplest way, though be careful it can lead to an incorrect result:            
      setImage({
        src: blob,
        type: files[0].type
      })
    }
    // Clear the event target value to give the possibility to upload the same image:        
    event.target.value = '';
  };

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null, type: "logo" | "coverPhoto") => {
    if (!file) return;

    const allowedTypesLogo = ["image/png", "image/svg+xml"];
    const allowedTypesCover = ["image/png", "image/jpeg", "image/svg+xml"];
    if (type === 'logo' && !allowedTypesLogo.includes(file.type)) {
      alert("Only PNG, or SVG files are allowed.", 5000, 'error');
      return;
    }
    if (type === 'coverPhoto' && !allowedTypesCover.includes(file.type)) {
      alert("Only PNG, JPEG, or SVG files are allowed.", 5000, 'error');
      return;
    }

    const previewURL = URL.createObjectURL(file);

    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(previewURL);
    } else {
      setCoverFile(file);
      setCoverPreview(previewURL);
    }
  };

  const handleDone = () => {
    const canvas = cropperRef.current?.getCanvas();
    if (canvas) {
      setOpenCropper(false)
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'avatar_image.jpg', {
            type: blob.type,
            lastModified: Date.now()
          })
          const previewURL = URL.createObjectURL(file);

          if (type === "logo") {
            setLogoFile(file);
            setLogoPreview(previewURL);
          } else {
            setCoverFile(file);
            setCoverPreview(previewURL);
          }
        }
      }, 'image/jpeg');
    }
  }


  const onSubmit = (data: Inputs) => {
    updateMedia({
      profile_picture: logoFile ?? undefined,
      cover_photo: coverFile ?? undefined,
    });
    updateSocial({
      ...data
    });
    setPage(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-[1.7fr_1fr]">
      <div className="w-full p-6 md:p-8 flex flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#0F1729] dark:text-neutral-200 flex gap-2 items-center">
            <LuImage />
            Profile Media
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Upload your business logo and cover photo for your profile
          </p>
        </div>

        {/* Cover Photo Upload */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="coverPhoto"
              className="text-sm font-medium text-[#0F1729] dark:text-neutral-200"
            >
              Cover Photo
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onUpload('cover')}
            >
              <LuUpload />
              Upload
            </Button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onLoadImage}
            // onChange={(e) =>
            //   handleFileChange(e.target.files?.[0] ?? null, "coverPhoto")
            // }
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-neutral-400">
            Recommended size: 1500×500px (JPG, PNG)
          </p>
          <div className="border border-dashed aspect-video w-full rounded-md bg-gray-50 text-center text-sm text-gray-400">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full aspect-video object-cover rounded"
              />
            ) : (
              "No cover photo uploaded"
            )}
          </div>
        </div>

        {/* Company Logo Upload */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="companyLogo"
              className="text-sm font-medium text-[#0F1729] dark:text-neutral-200"
            >
              Company Logo
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onUpload('logo')}
            >
              <LuUpload />
              Upload
            </Button>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              // onChange={onLoadImage}
              onChange={(e) =>
                handleFileChange(e.target.files?.[0] ?? null, "logo")
              }
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-neutral-400">
            Recommended size: 500×500px (PNG, SVG)
          </p>
          <div className="w-fit mx-auto shadow-md bg-white rounded-md dark:bg-neutral-700 dark:shadow-neutral-800">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="size-24 object-contain rounded p-2"
              />
            ) : (
              <div className="text-4xl text-gray-400 p-4">
                <LuBuilding2 size={96} />
              </div>
            )}
          </div>
        </div>

        {/* Media Guidelines */}
        <div className="border-t dark:border-t-neutral-700 pt-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
          <h4 className="font-medium mb-1">Media Guidelines:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Logo: Square format (1:1), transparent background preferred</li>
            <li>Cover photo: Landscape format (3:1), high resolution</li>
            <li>
              Avoid text in cover photo as it may be cropped on smaller screens
            </li>
            <li>Maximum file size: 5MB per image</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <b className="w-full relative text-[20px] leading-[28px] inline-block text-[#0F1729] dark:text-neutral-200 text-left h-7">Add Social Links</b>
        <div className="w-full relative rounded-xl border-gray-200 dark:border-neutral-700 border-solid border-[1px] box-border space-y-4 p-[17px]">
          <Input {...register("linkedIn")} error={errors.linkedIn?.message} label="LinkedIn *" icon={FaLinkedin} />
          <Input {...register("github")} error={errors.github?.message} label="GitHub" icon={FaGithub} />
          <Input {...register("twitter")} error={errors.twitter?.message} label="Twitter" icon={FaXTwitter} />
          <Input {...register("other")} error={errors.other?.message} label="Other" />
        </div>
      </div>

      <div className="col-span-full flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={() => setPage(2)}>
          Back
        </Button>
        <Button>Continue</Button>
      </div>
      {openCropper && <Portal open={openCropper}>
        {image && <div className="w-full relative h-full flex items-center flex-col">
          <Cropper ref={cropperRef} className="max-h-screen w-full md:w-auto" stencilProps={{
            aspectRatio: type === 'logo' ? 1 : 16 / 9,
            movable: true,
            resizable: true
          }} src={image?.src} />
          <div className="md:absolute md:top-0 bottom-0 left-0 flex mt-4 gap-2">
            <Button variant="outline" type="button" className="rounded-full h-fit" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" className="rounded-full h-fit" onClick={handleDone}>
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
    </form>
  );
};

export default ProfileMedia;
