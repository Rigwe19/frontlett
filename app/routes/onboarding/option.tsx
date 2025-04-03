import React, { useState } from 'react'
import { LuBriefcase, LuGraduationCap, LuMegaphone } from 'react-icons/lu'
import Card from '~/components/dashboard/card'

type Props = {}
const options = [{
    icon: LuBriefcase,
    title: 'Employee',
    description: 'Skilled professionals for short- term or project-based work.',
    to: '/onboarding/signup'
},{
    icon: LuGraduationCap,
    title: 'Advisor',
    description: 'Consultants and mentors for specialized guidance.',
    to: '/onboarding/signup'
},{
    icon: LuMegaphone,
    title: 'Influencer',
    description: 'Content creators and brand ambassadors.',
    to: '/onboarding/signup'
},]
const Option = (props: Props) => {
    const [active, setActive] = useState(-1);
    return (
        <div className="flex relative justify-center items-center min-h-screen font-general">
            <div className="absolute h-2.5 top-0 left-0 right-0 grid grid-cols-4">
                <div className="bg-primary w-full h-full col-span-2"></div>
            </div>
            <div className="flex flex-col w-9/10 xl:w-7/10 justify-center items-center gap-8">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold text-xl lg:text-4xl leading-8 text-center">Which describes you best?</h2>
                    <p className="leading-6 text-[#6B7280] dark:text-neutral-300">Select the option that best matches your expertise</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    {options.map((option, index)=><Card key={option.title} onClick={()=>setActive(pv=>pv===index?-1:index)} option={option} active={active===index} />)}
                </div>
            </div>
        </div>
    )
}

export default Option