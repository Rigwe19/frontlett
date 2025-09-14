import { useEffect, useState } from "react";
import { cn } from "~/libs/utils";
import { useNavigate } from "react-router";
import type { Route } from "./+types/complete";
import BusinessDetails from "~/components/employer_onboarding/business-details";
import ContactPerson from "~/components/employer_onboarding/contact-person";
// import ComplianceTrust from "~/components/employer_onboarding/compliance-trust";
import ProfileMedia from "~/components/employer_onboarding/profile-media";
import ReadinessQuiz from "~/components/employer_onboarding/readiness-quiz";
import useAuth from "~/stores/authStore";
import { employerQuestions } from "~/libs/schools";
import { post } from "~/libs/axios";
import useEmployerOnboardingStore from "~/stores/employerOnboardingStore";
import { LuCheck } from "react-icons/lu";
import Portal from "~/components/dashboard/portal";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Frontlett - Complete Profile" },
    {
      name: "description",
      content: "Join as an employer and make your first hire.",
    },
  ];
}

const steps = [
  "Step 1: Business Details",
  "Step 2: Contact Person",
  // "Step 3: Compliance & Trust",
  "Step 3: Profile Media",
  "Step 4: Readiness Quiz",
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export default function OnboardingProfile() {
  const [page, setPage] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const { business, media, contact, social } = useEmployerOnboardingStore()
  const authUser = useAuth((state) => state.user);
  const updateUser = useAuth((state) => state.updateUser);

  const businessNamePresent = !!authUser?.profile?.company_name;
  const rcNumberPresent = !!authUser?.rc_number;

  const prefilled = businessNamePresent && rcNumberPresent;

  const baseProgress = prefilled ? 20 : 0; // If prefilled, start at 20%
  const stepWeight = prefilled ? 20 : 25;

  const getSlideProgress = () => {
    let progress = baseProgress + (page - 1) * stepWeight;

    if (page === 4 && quizQuestions.length > 0) {
      const quizProgress =
        (answeredQuestions / quizQuestions.length) * stepWeight;
      progress = baseProgress + 3 * stepWeight + quizProgress;
    }

    return Math.min(Math.round(progress), 100);
  };

  useEffect(() => {
    setQuizQuestions(employerQuestions);
  }, []);

  const percentageCompleted = getSlideProgress();
  // setAnsweredQuestions((prev) => Math.min(prev - 1, quizQuestions.length));

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const nextCount = answeredQuestions + 1;
    const totalQuestions = quizQuestions.length;

    setAnsweredQuestions((prev) => Math.min(prev + 1, totalQuestions));
    setSelectedAnswer(null);
  };
  const handleQuizComplete = async () => {
    const fd = new FormData();
    Object.entries(contact).forEach(value => {
      fd.append(value[0], value[1]);
    });
    Object.entries(business).forEach(value => {
      fd.append(value[0], value[1]);
    });
    Object.entries(media).forEach(value => {
      fd.append(value[0], value[1]);
    });
    Object.entries(social).forEach(value => {
      fd.append(value[0], value[1]);
    });
    await post<FormData, { success: boolean }>('/profile/company', fd, true)
      .then(res => {
        const { success } = res.data;
        if (success) {
          setIsSuccess(true)
          setTimeout(() => {
            updateUser({
              profile: {
                ...authUser?.profile,
                is_completed: true,
              },
            });
            navigate("/dashboard");
          }, 5000)

        }
      })

  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Progress Bar */}
      <div className="flex gap-2">
        <div className="flex-1 h-3 md:h-4.5 flex items-center">
          <div
            className="h-full bg-[#FF8500] rounded-full transition-all duration-300"
            style={{ width: `${percentageCompleted}%` }}
          ></div>
        </div>
        <p className="text-[#0F1729] dark:text-neutral-300 font-medium leading-6">
          {percentageCompleted}% Complete
        </p>
      </div>

      {/* Step Content */}
      <div className="w-full gap-8 flex flex-col mt-[33px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-4">
            {steps.map((item, index) => (
              <div
                key={item}
                className={cn(
                  "py-2.5 px-1",
                  index <= page - 1
                    ? "border-b-2 text-primary border-b-primary font-bold"
                    : "border-b text-[#64748B] dark:text-neutral-400"
                )}
              >
                {item}
              </div>
            ))}
          </div>

          {page === 1 && <BusinessDetails setPage={setPage} />}
          {page === 2 && <ContactPerson setPage={setPage} />}
          {/* {page === 3 && <ComplianceTrust setPage={setPage} />} */}
          {page === 3 && <ProfileMedia setPage={setPage} />}
          {page === 4 &&
            quizQuestions.length > 0 &&
            answeredQuestions <= quizQuestions.length && (
              <ReadinessQuiz
                setPage={setPage}
                quizQuestions={quizQuestions}
                answeredQuestions={answeredQuestions}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                handleNextQuestion={handleNextQuestion}
                setAnsweredQuestions={setAnsweredQuestions}
                onComplete={handleQuizComplete}
              />
            )}
          <Portal open={isSuccess}>
            <div className="flex items-center justify-center fixed inset-0">
              <div className="relative bg-gray-200 dark:bg-neutral-700 rounded-md px-10 py-8 text-center text-[20px] text-gray-700 dark:text-gray-200">
                <div className="flex flex-col items-center justify-center">
                  <div className="self-stretch flex flex-col items-center justify-start gap-4">
                    <div className="size-16 rounded-full flex items-center justify-center bg-[#10B981]">
                      <LuCheck size={32} />
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <b className="relative leading-[32px] inline-block h-[30px] shrink-0">Profile Setup Completed</b>
                      <div className="relative text-[16.02px] leading-[24px] text-dimgray inline-block h-12 shrink-0">{`Your profile has been set up completely you can now proceed to post job offers `}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </Portal>
        </div>
      </div>
    </div>
  );
}