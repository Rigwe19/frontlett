import { LuCalendar, LuDollarSign, LuUser } from "react-icons/lu";

const tips = [{
    title: 'Time Slots Matter',
    description: 'Be specific about your time slot requirements. Candidates with matching availability are more likely to apply.',
    icon: LuCalendar
}, {
    title: 'Competitive Rates',
    description: 'Set competitive rates based on the skills required. Our platform average is NGN400- 600/hour for most roles.',
    icon: LuDollarSign
}, {
    title: 'Be Descriptive',
    description: 'Detailed job descriptions attract more qualified candidates. Include specific tasks and expectations.',
    icon: LuUser
}];
const days = [{
    label: 'Monday',
    value: 'Mon'
},{
    label: 'Tuesday',
    value: 'Tue'
},{
    label: 'Wednesday',
    value: 'Wed'
},{
    label: 'Thursday',
    value: 'Thur'
},{
    label: 'Friday',
    value: 'Fri'
},];
const tabs = ['Job Details', 'Requirements', 'Budgets', 'Preview'];

const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM']

const levels = [{
    label: 'Beginner Level',
    value: 'Beginner Level'
},{
    label: 'Mid Level',
    value: 'Mid Level'
},{
    label: 'Senior Level',
    value: 'Senior Level'
},]
export {
    tips, days, tabs, times, levels
}