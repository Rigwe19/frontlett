import React from 'react';
import Button from './ui/button';

interface BlogPost {
    id: number;
    category: string;
    categoryColor: string;
    date: string;
    author: string;
    title: string;
    description: string;
    image: string;
}

const InsightsSection: React.FC = () => {
    const blogPosts: BlogPost[] = [
        {
            id: 1,
            category: "Industry Trends",
            categoryColor: "bg-blue-600",
            date: "May 15, 2023",
            author: "Alex Chen",
            title: "The Future of Remote Teams: Why Virtual Teams Are Here to Stay",
            description: "Explore how virtual teams are reshaping the way businesses operate and why Frontlett is leading the charge.",
            image: "/images/posts/future.webp"
        },
        {
            id: 2,
            category: "Best Practices",
            categoryColor: "bg-blue-600",
            date: "April 22, 2023",
            author: "Maya Johnson",
            title: "5 Ways to Improve Industrial Workforce Efficiency",
            description: "Learn practical strategies to boost productivity and efficiency in your industrial workforce.",
            image: "/images/posts/ways.webp"
        },
        {
            id: 3,
            category: "Technology",
            categoryColor: "bg-blue-600",
            date: "March 10, 2023",
            author: "David Wilson",
            title: "How Automation is Transforming Industrial Workforce Management",
            description: "Discover the latest automation technologies and how they're changing the landscape of industrial work.",
            image: "/images/posts/automation.webp"
        }
    ];

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Latest Updates
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                        Insights on{" "}
                        <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                            Virtualting
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn More About Our Work and Industry Trends
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
                            <div className="relative">
                                <img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className={`absolute top-4 left-4 ${post.categoryColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 flex-grow">
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <div className="flex items-center mr-4">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        {post.date}
                                    </div>

                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        {post.author}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-blue-800 mb-3">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-4">
                                    {post.description}
                                </p>
                            </div>

                            <div className="px-6 pb-6">
                                <a
                                    href="#"
                                    className="inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button>
                        View All Articles
                        <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;
