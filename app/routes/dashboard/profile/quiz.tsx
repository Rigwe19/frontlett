import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Label, Radio, RadioGroup } from '@headlessui/react'
import { useState } from 'react'
import { HiDocument } from 'react-icons/hi2'
import { LuArrowRight, LuChevronRight, LuCircleAlert, LuX } from 'react-icons/lu'
import { useNavigate } from 'react-router'
import Button from '~/components/ui/button'
import { post } from '~/libs/axios'
import { questions, type QuizQuestion } from '~/libs/schools'
import useAuth from '~/stores/authStore'

type Props = {}
const Quiz = (props: Props) => {
    const navigate = useNavigate();
    const { updateUser, user } = useAuth();
    const [answers, setAnswers] = useState<Record<number, string>>({
        1: "",
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: "",
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
        19: '',
        20: '',
        21: "",
        22: '',
        23: '',
    });

    const [errors, setErrors] = useState<QuizQuestion[]>([]);

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleSave = async () => {
        // if(Object.keys(answers).length < 23){
        //     console.log('not all')
        //     return;
        // }
        // if (Object.values(answers).some(value => ['No', ''].includes(value))) {
        //     const error = questions.filter((value, index) => {
        //         if (answers[value.id] !== 'Yes') {
        //             return true
        //         }
        //         return false
        //     })
        //     error.splice(10)
        //     setErrors(error)
        //     setIsOpen(true)
        //     return
        // }
        await post<any, { success: boolean }>('/profile/finish', {})
            .then(res => {
                const { success } = res.data
                if (success) {
                    const us = {...user};
                    if(us?.profile){
                        us.profile.is_completed = true;
                    }
                    updateUser(us)
                    navigate('/dashboard')
                }
            })
    }
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="flex flex-col gap-8">
            <div className="w-full">
                <h1 className="text-[#0f1729] dark:text-neutral-200 text-3xl font-bold mb-6">Readiness Quiz</h1>

                <div className="border border-[#e2e8f0] dark:border-neutral-500 rounded-2xl p-6 bg-white dark:bg-neutral-700">
                    {questions.map((question) => (
                        <div key={question.id} className="mb-10 last:mb-0">
                            <div className="flex gap-2 mb-4">
                                <span className="font-medium text-[#0f1729] dark:text-neutral-200">{question.id}.</span>
                                <span className="font-medium text-[#0f1729] dark:text-neutral-200">{question.question}</span>
                            </div>

                            <RadioGroup
                                value={answers[question.id]}
                                onChange={(value) => handleAnswerChange(question.id, value)}
                                className="space-y-3 ml-7"
                            >
                                {question.options.map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <Radio
                                            value={option}
                                            id={`q${question.id}-${option}`}
                                            className="group flex size-5 items-center justify-center rounded-full border bg-white dark:bg-neutral-600 data-checked:bg-primary dark:data-checked:bg-blue-200"
                                        // className="border-[#c4c4c4] data-[state=checked]:border-[#1279e0] data-[state=checked]:bg-[#1279e0]"
                                        >
                                            <span className="invisible size-2.5 rounded-full bg-white dark:bg-neutral-600 group-data-checked:visible" />
                                        </Radio>
                                        <Label htmlFor={`q${question.id}-${option}`} className="font-normal text-[#0f1729] dark:text-neutral-200">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>
            </div>
            <Button onClick={handleSave} className="self-end">Proceed <LuArrowRight /></Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 gap-4">
                    <DialogPanel className="max-w-2xl space-y-2.5 border dark:border-neutral-500 bg-white dark:bg-neutral-700 p-6 rounded-md">
                        <DialogTitle className="font-bold flex text-2xl items-center justify-between">
                            <div className="flex items-center gap-3">
                                <LuCircleAlert size={28} className="text-red-500" />
                                Complete the Quiz First!
                            </div>
                            <LuX onClick={()=>setIsOpen(false)} />
                        </DialogTitle>
                        <Description className="text-[#4B5563] dark:text-neutral-400">Please correct your answers for the following questions before proceeding:</Description>
                        <div className="flex flex-col gap-2 mt-4">
                            {errors.map(error => <div key={error.id} className="rounded-md justify-between gap-3 w-full h-8 bg-[#FEE2E2]  text-[#DC2626] flex items-center px-2">
                                <span className="font-bold">{error.id}</span>
                                <span className="flex-1 line-clamp-1 text-xs">{error.question}</span>
                                <div className="flex items-center">
                                    <HiDocument size={24} />
                                    <LuChevronRight size={18} />
                                </div>
                            </div>)}
                        </div>
                    </DialogPanel>
                </div>
                Hello title={'Complete the Quiz First'}
            </Dialog>
        </div>
    )
}

export default Quiz