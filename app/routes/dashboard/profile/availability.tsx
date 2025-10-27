import React, { useEffect, useState } from 'react'
import { LuClock, LuX } from 'react-icons/lu'
import { useLoaderData, useNavigate } from 'react-router'
import Select from '~/components/dashboard/select'
import Button from '~/components/ui/button'
import { get, post } from '~/libs/axios'
import { times, days } from '~/libs/job_data'
import useAuth from '~/stores/authStore'
export const clientLoader = async () => {
  try {
    const res = await get<{ success: boolean, profile: { availability: any; } }>('profile')

    const { success, profile } = res.data;
    if (success) {
      return {
        availability: profile?.availability,
      }
    }
  } catch (error) {
    return {
      availability: {}
    }
  }
}

const Availability = () => {
  const navigate = useNavigate()
  const { availability } = useLoaderData<any>()
  const result = Object.entries(availability??[]).flatMap(([day, slots]) =>
    (slots as string[]).map((slot) => {
      const [start, end] = slot.split("-");
      return { day, start, end };
    })
  );
  const [timeSlot, setTimeSlot] = useState(result.length > 0 ? true : false);
  const [slots, setSlots] = useState<any[]>(result ?? []);
  const initialDay = {
    day: '',
    start: '',
    end: ''
  }
  const { updateStep } = useAuth();
  const [dayForm, setDayForm] = useState(initialDay);
  useEffect(() => {
    if (dayForm.start) {
      const index = times.findIndex(value => value === dayForm.start);

      setDayForm(pv => ({ ...pv, end: times[index + 2] }))
    }
  }, [dayForm.start]);
  const handleChange = (field: string, value: string) => {
    setDayForm(pv => ({ ...pv, [field]: value }));
  }

  const addSlot = () => {
    const value = [...slots]
    const isNotValid = value.find(item => item.day === dayForm.day && item.start === dayForm.start && item.end === dayForm.end)
    if (!isNotValid) value?.push(dayForm)
    setSlots(value)
    setDayForm(initialDay)
    setSErrors({ slots: '' })
  }

  const handleCopy = () => {
    const newValue = days.map(day => ({
      day: day.value,
      start: dayForm.start,
      end: dayForm.end
    }))
    // newValue.forEach(value => {
    //   // const filt = 
    // });
    // const merged = [...slots, ...newValue];
    const merged = slots.concat(newValue)
    // const unique = [...new Map(merged.map(item=>[item.id, item])).values()];
    const unique = merged.reduce((acc, current) => {
      if (!acc.find((item: { day: any; start: any; end: any }) => item.day === current.day && item.start === current.start && item.end === current.end)) {
        acc.push(current)
      }
      return acc;
    }, [])
    setSlots(unique)
    setDayForm(initialDay)
    setSErrors({ slots: '' })
  }
  const handleDelete = (index: number) => {
    const value = [...slots];
    value.splice(index, 1)
    setSlots(value)
  }
  const [sErrors, setSErrors] = useState({
    slots: ''
  });
  const onSubmit = async () => {
    if (slots.length === 0) {
      setSErrors(pv => ({ ...pv, slots: 'Please add a availability slots to continue' }))
      return;
    }

    try {
      await post<any, { success: boolean; step: number }>('profile/availability', { slots })
        .then(res => {
          const { success, step } = res.data;
          if (success) {
            updateStep(step)
            navigate('/dashboard/complete-profile/details');
          }
        })
    } catch (error) {
      console.error('Error:', error);
      setSErrors((prev) => ({
        ...prev,
        // document: 'An error occurred while submitting the form. Please try again.',
      }));
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-[#0f1729] dark:text-neutral-300 text-3xl font-bold mb-6">Set your availability</h1>

        {/* Info box */}
        <div className="bg-[#f0f5ff] dark:bg-neutral-700 rounded-xl p-4 mb-8 flex items-start gap-3">
          <div className="text-[#2563eb] dark:text-neutral-200 mt-1">
            <LuClock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[#2563eb] dark:text-neutral-200 text-lg font-medium mb-1">Why set availability?</h2>
            <p className="text-[#2563eb] dark:text-neutral-200 text-base">
              Adding your available time slots helps clients find you for projects that match your schedule. You'll only
              be shown opportunities that fit your availability.
            </p>
          </div>
        </div>

        {/* Availability section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#0f1729] dark:text-neutral-300 text-2xl font-semibold">Your Availability</h2>
            <button onClick={() => setTimeSlot(true)} type="button" className="flex items-center gap-2 text-[#2563eb] bg-[#F0F5FF] dark:bg-neutral-700 dark:text-neutral-200 font-medium py-1 px-4 rounded-full">
              <span className="text-xl">+</span> Add Time Slot
            </button>
          </div>

          {/* Empty state */}
          {!timeSlot && <div className="border border-[#e2e8f0] dark:border-neutral-500 rounded-xl p-12 flex flex-col items-center justify-center">
            <div className="bg-[#f1f5f9] dark:bg-neutral-700 p-4 rounded-full mb-4">
              <LuClock className="h-8 w-8 text-[#64748b] dark:text-neutral-300" />
            </div>
            <h3 className="text-[#0f1729] dark:text-neutral-300 text-xl font-medium mb-2">No time slots added</h3>
            <p className="text-[#64748b] dark:text-neutral-400 text-center">Add your available time slots to get matched with projects.</p>
          </div>}

          {timeSlot && <div className="flex p-[17px] flex-col items-start gap-[10px] self-stretch rounded-[12px] border border-[#e2e8f0] dark:border-neutral-500">
            <div className="grid grid-cols-5 gap-2 w-full">
              {slots.map((slot, index) => <div key={`${slot.day}_${index}`} className="flex w-full py-1 px-2 justify-between items-center  rounded-[12px] border border-[#e2e8f0] dark:border-neutral-500 bg-[#FFF] dark:bg-neutral-700">
                <div className="flex flex-col items-start gap-1 flex-shrink-0 text-[#0F1729] dark:text-neutral-300">
                  <h2 className="self-stretch text-[16px] font-medium ">{slot.day}</h2>
                  <p className="text-sm">{slot.start}-{slot.end}</p>
                </div>
                <LuX size={16} onClick={() => handleDelete(index)} />
              </div>)}
            </div>
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              <div className="flex items-center gap-[50px] self-stretch">
                <Select value={dayForm.day} onChange={e => handleChange('day', e.target.value)} data={days} label="Day" placeholder="Select Day" />
                <Select value={dayForm.start} onChange={e => handleChange('start', e.target.value)} data={times.map(time => ({ label: time, value: time }))} label="Start Time" placeholder="Start Time" />
                <Select value={dayForm.end} onChange={e => handleChange('end', e.target.value)} data={times.map(time => ({ label: time, value: time }))} label="End Time" placeholder="End Time" />
              </div>
              <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
                <div className="flex gap-2 flex-col md:flex-row">
                  <Button type="button" onClick={addSlot} className="h-10">Add Slot</Button>
                  <Button type="button" onClick={handleCopy} className="h-10 bg-[#F0F5FF] dark:bg-neutral-600" variant="outline">Copy to All Weekdays</Button>
                </div>
                <Button type="button" onClick={() => setTimeSlot(false)} className="h-10 dark:border-neutral-400 border-[#64748B] text-[#64748B] dark:text-neutral-400 hover:bg-red-500/40" variant="outline">Cancel</Button>
              </div>
            </div>
            {sErrors.slots && <span className="text-sm text-red-500">{sErrors.slots}</span>}
          </div>}
        </div>
      </div>

      <Button onClick={onSubmit} className="self-end">Next: Set Your Availability</Button>
    </div>
  )
}

export default Availability
