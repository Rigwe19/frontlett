import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Label, Radio, RadioGroup } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { HiDocument } from 'react-icons/hi2'
import { LuArrowRight, LuChevronRight, LuCircleAlert, LuX } from 'react-icons/lu'
import { useNavigate } from 'react-router'
import Button from '~/components/ui/button'
import { post } from '~/libs/axios'
import { questions, type QuizQuestion } from '~/libs/schools'
import useAuth, { type User } from '~/stores/authStore'

type Props = {}
const Quiz = (props: Props) => {
    const navigate = useNavigate();
    const { updateUser, user } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            const savedPage = localStorage.getItem('quizCurrentPage');
            return savedPage ? parseInt(savedPage, 10) : 1;
        }
        return 1;
    });
    const [answers, setAnswers] = useState<Record<number, string>>(() => {
        if (typeof window !== 'undefined') {
            const savedAnswers = localStorage.getItem('quizAnswers');
            return savedAnswers ? JSON.parse(savedAnswers) : {};
        }
        return {};
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('quizAnswers', JSON.stringify(answers));
        }
    }, [answers]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('quizCurrentPage', String(currentPage));
        }
    }, [currentPage]);

    const currentQuestion = questions[currentPage - 1];
    const totalQuestions = questions.length;

    const [errors, setErrors] = useState<QuizQuestion[]>([]);

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleNext = () => {
        if (currentPage < totalQuestions) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSave = async () => {
        const unanswered = questions.filter(q => !answers[q.id] || answers[q.id] === '');
        if (unanswered.length > 0) {
            const error = questions.filter((value) => {
                return !answers[value.id] || answers[value.id] === '';
            })
            error.splice(10) // limit to 10 errors shown
            setErrors(error)
            setIsOpen(true)
            return
        }

        await post<any, { success: boolean, user: User }>('/profile/finish', {})
            .then(res => {
                const { success, user } = res.data
                if (success) {
                    updateUser(user)
                    navigate('/dashboard')
                }
            })
    }
    const [isOpen, setIsOpen] = useState(false)

    if (!currentQuestion) {
        return <div>Loading quiz...</div>;
    }
    console.log(user);
    return (
        <div className="flex flex-col gap-8">
            <div className="w-full">
                <h1 className="text-[#0f1729] dark:text-neutral-200 text-3xl font-bold mb-6">Readiness Checklist</h1>

                <div className="border border-[#e2e8f0] dark:border-neutral-500 rounded-2xl p-6 bg-white dark:bg-neutral-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-primary">Question {currentPage} of {totalQuestions}</h2>
                        <div className="w-full max-w-sm bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(currentPage / totalQuestions) * 100}%` }}></div>
                        </div>
                    </div>
                    <div key={currentQuestion.id} className="mb-10 last:mb-0">
                        <div className="flex gap-2 mb-4">
                            <span className="font-medium text-[#0f1729] dark:text-neutral-200">{currentQuestion.id}.</span>
                            <span className="font-medium text-[#0f1729] dark:text-neutral-200">{currentQuestion.question}</span>
                        </div>

                        <RadioGroup
                            value={answers[currentQuestion.id] || ''}
                            onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                            className="space-y-3 ml-7"
                        >
                            {currentQuestion.options.map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                    <Radio
                                        value={option}
                                        id={`q${currentQuestion.id}-${option}`}
                                        className="group flex size-5 items-center justify-center rounded-full border bg-white dark:bg-neutral-600 data-checked:bg-primary dark:data-checked:bg-blue-200"
                                    >
                                        <span className="invisible size-2.5 rounded-full bg-white dark:bg-neutral-600 group-data-checked:visible" />
                                    </Radio>
                                    <Label htmlFor={`q${currentQuestion.id}-${option}`} className="font-normal text-[#0f1729] dark:text-neutral-200">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="flex justify-between mt-8">
                        <Button onClick={handlePrevious} disabled={currentPage === 1} variant="outline">Previous</Button>
                        {currentPage < totalQuestions && <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>Next</Button>}
                        {currentPage === totalQuestions && <Button onClick={handleSave}>Proceed <LuArrowRight /></Button>}
                    </div>
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/60" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 gap-4">
                    <DialogPanel className="max-w-2xl space-y-2.5 border dark:border-neutral-500 bg-white dark:bg-neutral-700 p-6 rounded-md">
                        <DialogTitle className="font-bold flex text-2xl items-center justify-between">
                            <div className="flex items-center gap-3">
                                <LuCircleAlert size={28} className="text-red-500" />
                                Complete the Checklist First!
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
                {/* Hello title={'Complete the Checklist First'} */}
            </Dialog>
        </div>
    )
}

export default Quiz