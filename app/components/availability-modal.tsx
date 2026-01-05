import React, { useEffect, useState } from 'react';
import { LuClock, LuX, LuPlus, LuCopy } from 'react-icons/lu';
import Modal from '~/components/dashboard/modal';
import Select from '~/components/dashboard/select';
import Button from '~/components/ui/button';
import { post } from '~/libs/axios';
import { times, days } from '~/libs/job_data';
import useAuth from '~/stores/authStore';
import { useLoader } from '~/stores/loaderStore';

interface AvailabilityModalProps {
    isOpen: boolean;
    closeModal: () => void;
    availability: { [key: string]: string[] };
    onSuccess: (profile: any) => void;
}

const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ isOpen, closeModal, availability, onSuccess }) => {
    const { alert } = useLoader();
    const { updateUser, user } = useAuth();
    const result = Object.entries(availability ?? {}).flatMap(([day, slots]) =>
        (slots as string[]).map((slot) => {
            const [start, end] = slot.split("-");
            return { day, start, end };
        })
    );

    const [slots, setSlots] = useState<any[]>(result ?? []);
    const initialDay = { day: '', start: '', end: '' };
    const [dayForm, setDayForm] = useState(initialDay);
    const [sErrors, setSErrors] = useState({ slots: '' });

    useEffect(() => {
        if (dayForm.start) {
            const index = times.findIndex(value => value === dayForm.start);
            const endIndex = index + 2 < times.length ? index + 2 : times.length - 1;
            setDayForm(pv => ({ ...pv, end: times[endIndex] }));
        }
    }, [dayForm.start]);

    const handleChange = (field: string, value: string) => {
        setDayForm(pv => ({ ...pv, [field]: value }));
    };

    const addSlot = () => {
        if (!dayForm.day || !dayForm.start || !dayForm.end) {
            setSErrors({ slots: 'Please select a day, start time, and end time.' });
            return;
        }
        const value = [...slots];
        const isNotValid = value.find(item => item.day === dayForm.day && item.start === dayForm.start && item.end === dayForm.end);
        if (!isNotValid) {
            value.push(dayForm);
        }
        setSlots(value);
        setDayForm(initialDay);
        setSErrors({ slots: '' });
    };

    const handleCopy = () => {
        if (!dayForm.start || !dayForm.end) {
            setSErrors({ slots: 'Please select a start and end time to copy.' });
            return;
        }
        const weekdays = days.filter(d => d.value !== 'Sat' && d.value !== 'Sun');
        const newValue = weekdays.map(day => ({
            day: day.value,
            start: dayForm.start,
            end: dayForm.end
        }));

        const merged = slots.concat(newValue);
        const unique = merged.reduce((acc, current) => {
            if (!acc.find((item: { day: any; start: any; end: any }) => item.day === current.day && item.start === current.start && item.end === current.end)) {
                acc.push(current);
            }
            return acc;
        }, []);
        setSlots(unique);
        setDayForm(initialDay);
        setSErrors({ slots: '' });
    };

    const handleDelete = (index: number) => {
        const value = [...slots];
        value.splice(index, 1);
        setSlots(value);
    };

    const onSubmit = async () => {
        if (slots.length === 0) {
            setSErrors({ slots: 'Please add at least one availability slot to save.' });
            return;
        }

        try {
            const res = await post<any, { success: boolean; user: any, profile:any }>('profile/availability', { slots, is_profile: true });
            const { success, user, profile } = res.data;
            if (success) {
                alert('Availability updated successfully!', 3000, 'success');
                updateUser(user);
                onSuccess(profile)
                closeModal();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update availability.', 3000, 'error');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} title="Update Your Availability">
            <div className="flex flex-col gap-6 w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full max-h-48 overflow-y-auto pr-2">
                    {slots.map((slot, index) => (
                        <div key={`${slot.day}_${index}`} className="flex w-full py-1 px-2 justify-between items-center rounded-lg border border-[#e2e8f0] dark:border-neutral-500 bg-white dark:bg-neutral-800">
                            <div className="flex flex-col items-start gap-1 flex-shrink-0 text-[#0F1729] dark:text-neutral-300">
                                <h2 className="self-stretch text-sm font-medium">{slot.day}</h2>
                                <p className="text-xs">{slot.start}-{slot.end}</p>
                            </div>
                            <button onClick={() => handleDelete(index)}><LuX size={16} /></button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col md:flex-row items-center gap-4 self-stretch">
                        <Select value={dayForm.day} onChange={e => handleChange('day', e.target.value)} data={days} label="Day" placeholder="Select Day" />
                        <Select value={dayForm.start} onChange={e => handleChange('start', e.target.value)} data={times.map(time => ({ label: time, value: time }))} label="Start Time" placeholder="Start Time" />
                        <Select value={dayForm.end} onChange={e => handleChange('end', e.target.value)} data={times.map(time => ({ label: time, value: time }))} label="End Time" placeholder="End Time" />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
                        <div className="flex gap-2 flex-col md:flex-row">
                            <Button type="button" onClick={addSlot} className="h-10"><LuPlus />Add Slot</Button>
                            <Button type="button" onClick={handleCopy} className="h-10 bg-[#F0F5FF] dark:bg-neutral-800" variant="outline"><LuCopy />Copy to Weekdays</Button>
                        </div>
                    </div>
                    {sErrors.slots && <span className="text-sm text-red-500">{sErrors.slots}</span>}
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-neutral-600">
                    <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                    <Button type="button" onClick={onSubmit}>Save Availability</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AvailabilityModal;