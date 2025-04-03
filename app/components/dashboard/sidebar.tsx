import type React from "react"
import {
    LuLayoutDashboard,
    LuMessageSquare,
    LuChartPie,
    LuUser,
    LuCompass,
    LuBriefcase,
    LuFileText,
    LuWallet,
    LuSettings,
    LuLogOut,
    LuBell,
    LuMenu,
} from "react-icons/lu"
import { Link, Outlet } from "react-router"
import { motion, AnimatePresence, useMotionValue, useSpring, useVelocity } from 'framer-motion'
import { useState } from "react"
import { useMediaQuery } from "@uidotdev/usehooks";
import useAuth from "~/stores/authStore"

interface SidebarProps {
    activePage: string
}

const asideWidth = 256;
const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
    const { user, logout } = useAuth();
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");
    const [isOpen, setIsOpen] = useState(false);
    const x = useMotionValue(-asideWidth);
    const spring = useSpring(x, {
        stiffness: 100,
        damping: 15
    })
    const velocity = useVelocity(x);
    console.log(velocity)
    const handleToggleAside = () => {
        setIsOpen(pv => !pv)
    }
    const handleDragStart = () => {
        // Add class to the body to prevent scrolling while dragging
        document.body.style.overflow = 'hidden'
    }

    const handleDragEnd = () => {
        // Remove the class from the body
        document.body.style.overflow = 'unset'
        // check if the user has swipe enough to open the aside
        if (velocity.getVelocity() > 0.5) {
            setIsOpen(true)
        }
    }




    const navItems = [
        { icon: <LuLayoutDashboard size={20} />, label: "Dashboard", id: "dashboard", disabled: true },
        { icon: <LuMessageSquare size={20} />, label: "Messages", id: "messages", disabled: true },
        { icon: <LuChartPie size={20} />, label: "Analytics", id: "analytics", disabled: true },
        { icon: <LuUser size={20} />, label: "Profile", id: "profile", disabled: false },
    ]

    const leadItems = [
        { icon: <LuCompass size={20} />, label: "Discover", id: "discover", disabled: true },
        { icon: <LuBriefcase size={20} />, label: "Jobs", id: "jobs", disabled: true },
    ]

    const projectItems = [
        { icon: <LuFileText size={20} />, label: "Projects & Invoices", id: "projects", disabled: true },
        { icon: <LuWallet size={20} />, label: "Wallet", id: "wallet", balance: "0.00", disabled: true },
    ]

    const bottomItems = [
        { icon: <LuSettings size={20} />, label: "Settings", id: "settings", disabled: true, onClick: () => { } },
        { icon: <LuLogOut size={20} />, label: "Logout", id: "logout", button: true, onClick: logout },
    ]
    return (
        <div className="flex w-full font-general">
            <AnimatePresence>
                {isMobile && isOpen && <motion.div onClick={handleToggleAside} className="fixed inset-0 bg-black/50" />}
                <motion.aside
                    // style={{ x: spring }}
                    initial={{ x: -asideWidth }}
                    animate={{ x: !isMobile ? 0 : isOpen ? 0 : -asideWidth }}
                    exit={{ x: -asideWidth }}
                    transition={{ duration: 0.5 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className={`min-w-64 max-h-screen h-screen overflow-y-auto ${!isMobile ? 'flex' : isOpen ? 'flex translate-x-0' : 'hidden -translate-x-full'} border-r border-gray-200 absolute md:relative top-0 left-0 dark:border-neutral-500 flex-col bg-white dark:bg-neutral-700`}>
                    {/* Logo */}
                    <div className="p-4 border-b border-gray-200 dark:border-neutral-500">
                        <img src="/logo.png" alt="Frontlett Logo" className="h-10 mx-auto dark:hidden" />
                        <img src="/logo-white.svg" alt="Frontlett Logo" className="h-10 mx-auto dark:block hidden" />
                    </div>

                    {/* LuUser Profile */}
                    <div className="p-4 bg-blue-50 dark:bg-neutral-600 rounded-lg mx-3 my-4 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                            <svg width="39" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5525_6554)">
                                    <rect x="0.0625" y="-0.0913086" width="38.8785" height="40" rx="19.4393" fill="#F0F0F0" />
                                    <path d="M39.7258 42.1371C39.7258 53.1071 30.8329 62 19.8629 62C8.89292 62 0 53.1071 0 42.1371C0 31.1671 8.89292 22.2742 19.8629 22.2742C30.8329 22.2742 39.7258 31.1671 39.7258 42.1371Z" fill="#D9D9D9" />
                                    <path d="M25.2769 12.6186C25.2769 16.2372 22.9987 19.1706 19.3801 19.1706C15.7615 19.1706 13.5178 16.2372 13.5178 12.6186C13.5178 9.00007 15.7615 6.06664 19.3801 6.06664C22.9987 6.06664 25.2769 9.00007 25.2769 12.6186Z" fill="#D9D9D9" />
                                    <path d="M27.7504 8.24708L19.8989 6.00793C19.8751 6.00115 19.8503 5.99869 19.8256 6.00066L18.1826 6.1321C18.1536 6.13442 18.1255 6.1428 18.1 6.15671L18.0924 6.16088C17.9042 6.26352 17.9771 6.54942 18.1914 6.54942H18.7703C18.786 6.54942 18.8016 6.5512 18.8168 6.55472L20.1388 6.85978L21.6336 7.29162C21.6708 7.30237 21.7043 7.32337 21.7302 7.3522L22.8358 8.58425C22.8751 8.62798 22.9311 8.65296 22.9898 8.65296H27.6937C27.9337 8.65296 27.9812 8.3129 27.7504 8.24708Z" fill="#D9D9D9" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5525_6554">
                                        <rect x="0.0625" y="-0.0913086" width="38.8785" height="40" rx="19.4393" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* <img src="/placeholder.svg?height=40&width=40" alt="LuUser Avatar" className="w-full h-full rounded-full" /> */}
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-neutral-300">{user?.full_name}</h3>
                            <p className="text-xs text-gray-500 dark:text-neutral-400">No Headline</p>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex-1 px-3">
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        // to={`#${item.id}`}
                                        disabled={item.disabled}
                                        className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${activePage === item.id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-neutral-500"
                                            }`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* LEADS Section */}
                        <div className="mt-8">
                            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leads</h3>
                            <ul className="mt-2 space-y-1">
                                {leadItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            // href={`#${item.id}`}
                                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${activePage === item.id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-neutral-500"
                                                }`}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* PROJECTS & PAYMENTS Section */}
                        <div className="mt-8">
                            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects & Payments</h3>
                            <ul className="mt-2 space-y-1">
                                {projectItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            // href={`#${item.id}`}
                                            className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium group rounded-md w-full ${activePage === item.id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-neutral-500"
                                                }`}
                                        >
                                            <div className="flex gap-1">
                                                <span className="mr-3">{item.icon}</span>
                                                <span className="flex-1">{item.label}</span>
                                            </div>
                                            {item.balance && <div className="flex gap-0.5">
                                                <span className="text-xs text-gray-500 dark:text-neutral-400 group-hover:dark:text-neutral-500 font-sans">₦</span>
                                                <span className="text-xs text-gray-500 dark:text-neutral-400 group-hover:dark:text-neutral-500">{item.balance}</span>
                                                </div>}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Bottom Items */}
                    <div className="px-3 py-4 border-t border-gray-200 dark:border-neutral-500">
                        <ul className="space-y-1">
                            {bottomItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        // href={`#${item.id}`}
                                        onClick={item.onClick}
                                        className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${activePage === item.id
                                            ? "bg-blue-600 text-white"
                                            : item.id === "logout"
                                                ? "text-red-500 hover:bg-red-50"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-neutral-500"
                                            }`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.aside>
            </AnimatePresence>
            <div className="flex flex-col w-full">
                <nav className="h-[73px] py-4 px-4 bg-white dark:bg-neutral-700 w-full">
                    <ul className="w-full md:flex gap-4 justify-end items-center hidden">
                        <li className="rounded-full border border-[#E5E7EB] dark:border-neutral-500 px-3.5 py-2">
                            <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                Get discovered
                                <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span>
                            </button>
                        </li>
                        <li className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] dark:bg-neutral-600 dark:border-neutral-500 px-3.5 py-2">
                            <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                Work ID
                            </button>
                        </li>
                        <li className="">
                            <LuBell size={20} className="text-[#6B7280] dark:text-neutral-300" />
                        </li>
                        <li className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] dark:bg-neutral-600 dark:border-neutral-500 px-3.5 py-2">
                            <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                {user?.full_name?.charAt(0)?.toUpperCase()}
                            </button>
                        </li>
                    </ul>
                    <ul className="w-full flex gap-4 justify-end items-center md:hidden">
                        <li className="rounded-full px-3.5 py-2">
                            <button onClick={handleToggleAside} className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                <LuMenu size={32} />
                            </button>
                        </li>
                    </ul>
                </nav>
                <main className="py-2 px-4 font-general overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

export default Sidebar

