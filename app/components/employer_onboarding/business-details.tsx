// This code defines a React functional component named `BuisnessDetails` that is part of an employer profile onboarding process.

import { useEffect, useState } from "react";
import { LuBuilding2, LuMapPin } from "react-icons/lu";
import Input from "~/components/dashboard/input";
import Select from "~/components/dashboard/select";
import Textarea from "~/components/dashboard/textarea";
import Button from "~/components/ui/button";
import useAuth from "~/stores/authStore";
import useEmployerOnboardingStore from "~/stores/employerOnboardingStore";
// import { industries, sizes } from '~/libs/industries'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { countries } from '~/libs/countries';

interface BusinessDetailsProps {
  setPage: (page: number) => void;
}

type Inputs = {
  company_name?: string,
  rc?: string,
  industry?: string,
  size?: string,
  description?: string,
  address?: string,
  country?: string,
  state?: string,
  email?: string,
  website?: string,
}
const schema = yup
  .object({
    company_name: yup.string().required(),
    rc: yup.string().required(),
    industry: yup.string().required(),
    size: yup.string().required(),
    description: yup.string().max(280).required(),
    address: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    website: yup.string().url().required(),
    email: yup.string().email().required(),
    // official_email: yup.string(),
  })
  .required()

const BusinessDetails: React.FC<BusinessDetailsProps> = ({ setPage }) => {
  const { updateBusiness, business } = useEmployerOnboardingStore()
  // const updateBusiness = useEmployerOnboardingStore((s) => s.updateBusiness);
  const { user } = useAuth();

  const rcVerified = user?.rc_verified ?? false;
  const [countryLists, setCountryLists] = useState<{
    label: string;
    value: string;
  }[]>([])
  const [stateLists, setStateLists] = useState<{
    label: string;
    value: string;
  }[]>([])
  const { control, formState: { errors }, register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company_name: user?.profile?.company_name ?? '',
      rc: user?.profile?.rc ?? '',
      size: user?.profile?.size ?? '',
      industry: user?.profile?.industry ?? '',
      description: business.description ?? '',
      address: business.address ?? '',
      country: business.country ?? '',
      state: business.state ?? '',
      email: business.official_email ?? '',
      website: business.website_url ?? '',
    }
  });
  console.log(business.state)
  useEffect(() => {
    const country = countries.map(value => ({ label: value.name, value: value.name }))
    setCountryLists(country)
  }, []);
  useEffect(() => {
    const count = countries.find(value => value.name === watch('country'));
    const state = count?.states.map(value => ({ label: value.name, value: value.name }))
    if (state) setStateLists(state)
  }, [watch('country')]);
  const onSubmit = async (form: Inputs) => {
    updateBusiness({
      industry: form.industry,
      size: form.size,
      description: form.description,
      address: form.address,
      country: form.country,
      state: form.state,
      official_email: form.email,
      website_url: form.website,
    });
    setPage(2);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 shadow-sm p-6 md:p-8 flex flex-col gap-6">
      {/* Heading Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#0F1729] dark:text-neutral-200 flex gap-2 items-center">
          <LuBuilding2 />
          Business Details
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Basic information about your business
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Business Name*"
            id="businessName"
            {...register("company_name")} error={errors.company_name?.message}
            disabled={!!user?.profile?.company_name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="RCNumber" className="text-sm font-medium">
            RC Number
          </label>
          {rcVerified && (
            <div className="text-green-600 text-sm mb-1">✔ Verified</div>
          )}
          <Input
            id="RCNumber"
            {...register("rc")} error={errors.rc?.message}
            disabled={!!user?.profile?.rc}
          />
        </div>
        <div>
          <Input
            label="Industry/Sector"
            id="industry"
            {...register("industry")} error={errors.industry?.message}
            placeholder="Select Industry"
            disabled={!!user?.profile?.industry}
          // data={industries.map(id => ({ label: id, value: id }))}
          />
        </div>
        <div>
          <Input
            label="Organization Size"
            id="organisation"
            {...register("size")} error={errors.size?.message}
            placeholder="Select Size"
            disabled={!!user?.profile?.size}
          // data={sizes.map(id => ({ label: id, value: id }))}
          />
        </div>
      </div>

      <div>
        <Textarea
          label="Business Description"
          {...register("description")} error={errors.description?.message}
          id="businessDescription"
          maxLength={280}
          placeholder="Tell talents about your business (280 characters max)"
        />
      </div>

      <div>
        <Input
          label="Office Address"
          icon={LuMapPin}
          {...register("address")} error={errors.address?.message}
          placeholder="Start typing your address..."
          id="officeAddress"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                label="Country"
                placeholder="Select Country"
                data={countryLists}
                error={errors.country?.message}
                id="country"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                label="State"
                placeholder="Select State"
                data={stateLists}
                error={errors.state?.message}
                id="state"
                {...field}
              />
            )}
          />
          {/* <Select
            label="State"
            placeholder="Select State"
            data={stateLists}
            {...register("state")} error={errors.state?.message}
            id="state"
          /> */}
        </div>
        <div>
          <div className="flex gap-2 items-end">
            <Input
              label="Official Email"
              {...register("email")} error={errors.email?.message}
              placeholder="your-business@domain.com"
              id="officialEmail"
            />
            {/* <Button>Verify</Button> */}
          </div>
        </div>
        <div>
          <Input
            label="Website URL"
            {...register("website")} error={errors.website?.message}
            placeholder="https://..."
            id="website"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button>Continue</Button>
      </div>
    </form>
  );
};

export default BusinessDetails;
