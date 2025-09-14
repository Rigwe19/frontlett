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
},{
    label: 'Saturday',
    value: 'Sat'
},{
    label: 'Sunday',
    value: 'Sun'
}];
const tabs = ['Job Details', 'Requirements', 'Budgets', 'Preview'];

const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM']

const levels = [{
    label: 'Intern Level 1',
    value: 'Intern Level 1',
    salary: 130000
},{
    label: 'Intern Level 2',
    value: 'Intern Level 2',
    salary: 130000
},{
    label: 'Intern Level 3',
    value: 'Intern Level 3',
    salary: 130000
},{
    label: 'Intern Level 4',
    value: 'Intern Level 4',
    salary: 130000
},{
    label: 'Junior Level 1',
    value: 'Junior Level 1',
    salary: 130000
},{
    label: 'Junior Level 2',
    value: 'Junior Level 2',
    salary: 130000
},{
    label: 'Junior Level 3',
    value: 'Junior Level 3',
    salary: 130000
},{
    label: 'Junior Level 4',
    value: 'Junior Level 4',
    salary: 130000
},{
    label: 'Mid Level 1',
    value: 'Mid Level 1',
    salary: 130000
},{
    label: 'Mid Level 2',
    value: 'Mid Level 2',
    salary: 130000
},{
    label: 'Mid Level 3',
    value: 'Mid Level 3',
    salary: 130000
},{
    label: 'Mid Level 4',
    value: 'Mid Level 4',
    salary: 130000
},{
    label: 'Senior Level 1',
    value: 'Senior Level 1',
    salary: 130000
},{
    label: 'Senior Level 2',
    value: 'Senior Level 2',
    salary: 130000
},{
    label: 'Senior Level 3',
    value: 'Senior Level 3',
    salary: 130000
},{
    label: 'Senior Level 4',
    value: 'Senior Level 4',
    salary: 130000
},{
    label: 'Advance Level 1',
    value: 'Advance Level 1',
    salary: 130000
},{
    label: 'Advance Level 2',
    value: 'Advance Level 2',
    salary: 130000
},{
    label: 'Advance Level 3',
    value: 'Advance Level 3',
    salary: 130000
},{
    label: 'Advance Level 4',
    value: 'Advance Level 4',
    salary: 130000
},{
    label: 'Executive Level 1',
    value: 'Executive Level 1',
    salary: 130000
},{
    label: 'Executive Level 2',
    value: 'Executive Level 2',
    salary: 130000
},{
    label: 'Executive Level 3',
    value: 'Executive Level 3',
    salary: 130000
},{
    label: 'Executive Level 4',
    value: 'Executive Level 4',
    salary: 130000
},{
    label: 'Director Level 1',
    value: 'Director Level 1',
    salary: 130000
},{
    label: 'Director Level 2',
    value: 'Director Level 2',
    salary: 130000
},{
    label: 'Director Level 3',
    value: 'Director Level 3',
    salary: 130000
},{
    label: 'Director Level 4',
    value: 'Director Level 4',
    salary: 130000
},]

const experiences = [{
    label: '0 Years',
    value: '0 Years'
},{
    label: '1-3 Years',
    value: '1-3 Years'
}, {
    label: '4-7 Years',
    value: '4-7 Years'
},{
    label: '8-12 Years',
    value: '8-12 Years'
},{
    label: 'Over 12 Years',
    value: 'Over 12 Years'
}]

const academicDegrees = [
  {
    label: "National Certificate in Education (NCE)",
    value: "NCE"
  },
  {
    label: "Higher National Diploma (HND)",
    value: "HND"
  },
  {
    label: "Ordinary National Diploma (OND)",
    value: "OND"
  },
  {
    label: "Bachelor's Degree",
    value: "BSc/B.A./B.Ed./LL.B"
  },
  {
    label: "Master's Degree",
    value: "MSc/M.A./M.Ed./LL.M"
  },
  {
    label: "Doctor of Philosophy (Ph.D.)",
    value: "Ph.D."
  },
  {
    label: "Postgraduate Diploma (PGD)",
    value: "PGD"
  },
  {
    label: "Professional Certificates (e.g., ICAN, NIMN)",
    value: "Professional Certificate"
  },
  {
    label: "Diploma",
    value: "Diploma"
  },
  {
    label: "Certificate",
    value: "Certificate"
  }
];
export {
    tips, days, tabs, times, levels, experiences, academicDegrees
}