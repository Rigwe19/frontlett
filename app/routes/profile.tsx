import { LuBriefcase, LuBuilding, LuCalendar, LuCircleCheckBig, LuGraduationCap, LuMapPin, LuSearch, LuStar, LuUser } from 'react-icons/lu';
import { get } from '~/libs/axios';
import type { Route } from './+types/profile';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import Button from '~/components/ui/button';

export function meta({ data }: Route.MetaArgs) {
    const name = data?.user?.full_name ?? 'User';
    return [
        { title: `Frontlett - ${name}'s Profile` },
        { name: "description", content: `View ${name}'s professional profile on Frontlett.` },
    ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    if (!params.username) {
        throw new Response("Not Found", { status: 404 });
    }
    try {
        const res = await get<{
            success: boolean,
            user: any,
            profile: {
                availability: { [key: string]: string[] };
                professional_headline: string;
                about: string;
                skills: string[];
                profile_picture: string;
                dp: string | undefined;
                address: string;
            },
            portfolio: { id: number; title: string; description: string; path: string; }[],
            education: { id: number; degree: string; institution: string; started_at: string; ended_at: string; }[],
            experiences: { id: number; title: string; company: string; started_at: string; ended_at: string; is_present: string; }[],
        }>(`user/profile/${params.username}`);

        const { success, user, profile, portfolio, education, experiences } = res.data;
        if (success) {
            if (profile?.profile_picture) {
                profile.dp = import.meta.env.VITE_BASE_SERVICE_URL + profile?.profile_picture;
            }
            return { user, profile, portfolio, education, experiences };
        } else {
            throw new Response("User not found", { status: 404 });
        }
    } catch (error) {
        // Assuming a 404 for any error for simplicity
        throw new Response("User not found", { status: 404 });
    }
}


const SharedProfile = ({ loaderData }: Route.ComponentProps) => {
    const { user, profile, portfolio, education, experiences } = loaderData;

    return (
        <div className="w-full flex flex-col gap-6 bg-gray-50 dark:bg-neutral-900 pb-12">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-b from-primary/10 to-transparent pt-10 pb-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="absolute bottom-0 translate-y-1/2 flex items-end gap-6">
                        <img
                            src={profile?.dp ?? "/images/avatar.png"}
                            alt={`${user?.full_name}'s profile`}
                            className="size-32 md:size-40 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg object-cover"
                        />
                        <div className="pb-4">
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100">{user?.full_name}</h1>
                            <p className="text-base md:text-lg text-gray-600 dark:text-neutral-400 mt-1">{profile?.professional_headline ?? 'No professional headline'}</p>
                            {profile?.address && (
                                <p className="text-sm text-gray-500 dark:text-neutral-500 inline-flex items-center gap-1.5 mt-2">
                                    <LuMapPin />
                                    {profile.address}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4">Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-yellow-500"><LuStar /><p className="text-gray-700 dark:text-neutral-300">0/5</p></div>
                                <p className="text-sm text-gray-500 dark:text-neutral-400">Rating</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-primary"><LuCircleCheckBig /><p className="text-gray-700 dark:text-neutral-300">0%</p></div>
                                <p className="text-sm text-gray-500 dark:text-neutral-400">Job Success</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {(profile?.skills?.length ?? 0) === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-neutral-400">No skills listed.</p>
                            ) : (
                                profile.skills.map((skill: string) => (
                                    <div key={skill} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {skill}
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4">About</h3>
                        <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed">
                            {profile?.about || "No about information provided."}
                        </p>
                    </section>

                    {portfolio?.length > 0 && (
                        <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4 flex items-center gap-2"><LuUser /> Portfolio</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {portfolio.map(item => <PortfolioCard key={item.id} item={item} />)}
                            </div>
                        </section>
                    )}

                    {experiences?.length > 0 && (
                        <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4 flex items-center gap-2"><LuBriefcase /> Work Experience</h3>
                            <div className="space-y-6">
                                {experiences.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4 flex items-center gap-2"><LuGraduationCap /> Education</h3>
                            <div className="space-y-6">
                                {education.map(edu => <EducationCard key={edu.id} edu={edu} />)}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

function PortfolioCard({ item }: { item: { title: string; description: string; path: string } }) {
    const imageUrl = `${import.meta.env.VITE_BASE_SERVICE_URL}${item.path}`;
    return (
        <div className="border dark:border-neutral-700 rounded-lg overflow-hidden group">
            <div className="relative h-40 bg-gray-100 dark:bg-neutral-700">
                <img src={imageUrl || "/placeholder.svg"} alt={item.title} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
                <h4 className="font-semibold text-gray-800 dark:text-neutral-200 truncate">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1 line-clamp-2">{item.description}</p>
            </div>
        </div>
    );
}

function ExperienceCard({ exp }: { exp: { title: string; company: string; started_at: string; ended_at: string | null; is_present: string } }) {
    return (
        <div className="border-b dark:border-neutral-700 pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-neutral-200">{exp.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-neutral-400 flex items-center gap-1.5 mt-1">
                        <LuBuilding size={14} /> {exp.company}
                    </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-neutral-500 text-right">
                    <p>{new Date(exp.started_at).getFullYear()} - {exp.is_present ? 'Present' : (exp.ended_at ? new Date(exp.ended_at).getFullYear() : 'N/A')}</p>
                </div>
            </div>
        </div>
    );
}

function EducationCard({ edu }: { edu: { degree: string; institution: string; started_at: string; ended_at: string } }) {
    return (
        <div className="border-b dark:border-neutral-700 pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-neutral-200">{edu.degree}</h4>
                    <p className="text-sm text-gray-600 dark:text-neutral-400 flex items-center gap-1.5 mt-1">
                        <LuGraduationCap size={14} /> {edu.institution}
                    </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-neutral-500 text-right">
                    <p>{new Date(edu.started_at).getFullYear()} - {new Date(edu.ended_at).getFullYear()}</p>
                </div>
            </div>
        </div>
    );
}

export default SharedProfile;

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-neutral-900 text-center px-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-6">
                    <LuSearch size={48} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-neutral-200 mb-2">Profile Not Found</h1>
                <p className="text-lg text-gray-600 dark:text-neutral-400 mb-8">
                    Sorry, we couldn't find the profile you're looking for.
                </p>
                <Button to="/dashboard">
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    // You can add more generic error handling here if needed
    return (
        <div>Something went wrong</div>
    );
}