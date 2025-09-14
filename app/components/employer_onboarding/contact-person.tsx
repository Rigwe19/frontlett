// This code defines a React functional component named `ContactPerson` that is part of an employer profile onboarding process.

import Button from "~/components/ui/button";
import Input from "~/components/dashboard/input";
import useEmployerOnboardingStore from "~/stores/employerOnboardingStore";
import { useState } from "react";
import useAuth from "~/stores/authStore";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { LuUser } from "react-icons/lu";

interface ContactPersonProps {
  setPage: (page: number) => void;
}

type Inputs = {
  contact_name: string,
  contact_role: string,
  contact_email: string,
  contact_phone_number: string,
}
const schema = yup
  .object({
    contact_name: yup.string().required(),
    contact_role: yup.string().required(),
    contact_email: yup.string().email().required(),
    contact_phone_number: yup.string().required(),
  })
  .required()

const ContactPerson: React.FC<ContactPersonProps> = ({ setPage }) => {
  const { updateContact, contact } = useEmployerOnboardingStore();
  const { user } = useAuth();

  const { formState: { errors }, register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      contact_name: user?.full_name ?? '',
      contact_email: user?.email ?? '',
      contact_role: contact.contact_role ?? '',
      contact_phone_number: contact.contact_phone_number ?? '',
    }
  });

  const onSubmit = async (form: Inputs) => {
    updateContact({
      contact_name: form.contact_name,
      contact_role: form.contact_role,
      contact_email: form.contact_email,
      contact_phone_number: form.contact_phone_number,
    });
    setPage(3);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg border bg-white dark:border-neutral-700 dark:bg-neutral-800 shadow-sm p-6 md:p-8 flex flex-col gap-6">
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#0F1729] dark:text-neutral-200 flex gap-2 items-center">
          <LuUser />
          Contact Person Details
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Who should talents reach out to?
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium" htmlFor="contactName">
            Contact Person Name
          </label>
          <Input
            id="contactName"
            {...register("contact_name")} error={errors.contact_name?.message}
            placeholder="Input name here"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="role">
            Role
          </label>
          <Input
            id="role"
            {...register("contact_role")} error={errors.contact_role?.message}
            placeholder="Eg: HR Manager"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Work Email
          </label>
          <Input
            id="email"
            {...register("contact_email")} error={errors.contact_email?.message}
            placeholder="example@yourdomain.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must match your business domain
          </p>
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="phone">
            Phone Number
          </label>
          {/* <div className="flex gap-2"> */}
          <Input
            id="phone"
            {...register("contact_phone_number")} error={errors.contact_phone_number?.message}
            placeholder="Enter phone number"
          />
          {/* <Button>Verify</Button>
          </div> */}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={() => setPage(1)}>
          Back
        </Button>
        <Button>Continue</Button>
      </div>
    </form>
  );
};

export default ContactPerson;
