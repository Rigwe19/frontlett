import { useMediaQuery } from "@uidotdev/usehooks"
import { AnimatePresence, motion, useMotionValue, useSpring, useVelocity } from 'framer-motion'
import type React from "react"
import { useState } from "react"
import {
    LuBell,
    LuBriefcase,
    LuChartPie,
    LuCompass,
    LuCopy,
    LuFileText,
    LuLayoutDashboard,
    LuLogOut,
    LuMenu,
    LuMessageSquare,
    LuPlus,
    LuSettings,
    LuUser,
    LuWallet,
} from "react-icons/lu"
import { TbAffiliate } from 'react-icons/tb'
import { NavLink, Outlet } from "react-router"
import useAuth from "~/stores/authStore"
import { useLoader } from "~/stores/loaderStore"

interface SidebarProps {
    activePage: string
}

const asideWidth = 256;
const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
    const { user, logout } = useAuth();
    const { alert } = useLoader()
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");
    const [isOpen, setIsOpen] = useState(false);
    const x = useMotionValue(-asideWidth);
    const spring = useSpring(x, {
        stiffness: 100,
        damping: 15
    })
    const velocity = useVelocity(x);
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
        { icon: <LuLayoutDashboard size={20} />, label: "Dashboard", path: '/dashboard', id: "dashboard", disabled: false },
        { icon: <LuMessageSquare size={20} />, label: "Messages", path: '/dashboard/messages', id: "messages", disabled: true },
        { icon: <LuChartPie size={20} />, label: "Analytics", path: '/dashboard/analytics', id: "analytics", disabled: true },
        { icon: <LuUser size={20} />, label: "Profile", path: '/dashboard/profile', id: "profile", disabled: false },
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

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleCopy = () => {
        const link = `${window.location.origin}/invite/${user?.referral_code}`;
        navigator.clipboard.writeText(link).then(() => {
            alert("Link copied to clipboard", 5000, 'success');
        }).catch(() => {
            alert("Failed to copy link", 5000, 'error');
        });
    }


    return (
        <div className="flex w-full font-general">
            <AnimatePresence>
                {isMobile && isOpen && <motion.div onClick={handleToggleAside} className="fixed z-[9] inset-0 bg-black/50" />}
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
                    className={`min-w-64 max-h-screen h-screen overflow-y-auto ${!isMobile ? 'flex' : isOpen ? 'flex translate-x-0 z-10' : 'hidden -translate-x-full'} border-r border-gray-200 absolute md:relative top-0 left-0 dark:border-neutral-500 flex-col bg-white dark:bg-neutral-700`}>
                    {/* Logo */}
                    <div className="p-4 border-b border-gray-200 dark:border-neutral-500">
                        <img src="/logo.png" alt="Frontlett Logo" className="h-10 mx-auto dark:hidden" />
                        <img src="/logo-white.svg" alt="Frontlett Logo" className="h-10 mx-auto dark:block hidden" />
                    </div>

                    {/* LuUser Profile */}
                    <div className="p-4 bg-blue-50 dark:bg-neutral-600 rounded-lg mx-3 my-4 flex flex-col items-center">
                        <div className="flex items-center w-full">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                                <img src="/images/avatar.png" alt="LuUser Avatar" className="w-full h-full rounded-full" />
                            </div>
                            <div className="ml-3">
                                <h3 className="">{user?.role !== 'business' ? user?.full_name : user?.company_name}</h3>
                                <p className="text-xs text-gray-500 dark:text-neutral-400">{user?.profile?.professional_headline??'No Headline'}</p>
                            </div>
                        </div>
                    </div>
                    {/* Affiliate Section */}
                    <div className="px-3 my-4">
                        <details className="group" open={false}>
                            <summary className="flex items-center justify-between cursor-pointer px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-neutral-500 transition">
                                <span className="flex items-center gap-2">
                                    <TbAffiliate size={20} />
                                    <span className="font-medium text-sm">Affiliate</span>
                                </span>
                                <svg className="w-4 h-4 ml-2 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="mt-2 bg-blue-50 dark:bg-neutral-500 rounded-lg p-4 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-neutral-300">Invite link:</span>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1 text-primary dark:text-neutral-200 text-xs hover:underline"
                                    >
                                        <span className="truncate max-w-[100px]">{`${window.location.origin}/invite/${user?.referral_code}`}</span>
                                        <LuCopy size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-neutral-300">Invited:</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-neutral-200">{user?.invited_count ?? 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-neutral-300">Invite tokens left:</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-neutral-200">{user?.invite_tokens ?? 0}</span>
                                </div>
                                <div className="flex items-center justify-end gap-1 mt-2">
                                    <span className="text-xs text-gray-400 dark:text-neutral-300">Powered by</span>
                                    <img src="/images/boldtell.png" alt="Boldtell Logo" className="h-8" />
                                </div>
                            </div>
                        </details>
                    </div>
                    {/* Main Navigation */}
                    <nav className="flex-1 px-3">
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.id} className={`${item.disabled ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                                    <NavLink
                                        onClick={handleClose}
                                        to={item.path}
                                        className={({ isActive }) => `flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-neutral-500"
                                            }`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </NavLink>
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
                                            onClick={handleClose}
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
                                            onClick={handleClose}
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
                                        onClick={() => { handleClose(); item.onClick() }}
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
                            {user?.role !== 'business' && <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                Get discovered{/**/}
                                <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span>
                            </button>}
                            {user?.role === 'business' && <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                Hire Resources
                                <LuPlus />
                                {/* <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span> */}
                            </button>}
                        </li>
                        {user?.role !== 'business' && <li className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] dark:bg-neutral-600 dark:border-neutral-500 px-3.5 py-2">
                            <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                Work ID
                            </button>
                        </li>}
                        <li className="">
                            <LuBell size={20} className="text-[#6B7280] dark:text-neutral-300" />
                        </li>
                        <li className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] dark:bg-neutral-600 dark:border-neutral-500 px-3.5 py-2">
                            <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                {user?.role !== 'business' && user?.full_name?.charAt(0)?.toUpperCase()}
                                {user?.role === 'business' && user?.company_name?.charAt(0)?.toUpperCase()}
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
                <main className="py-2 md:px-4 px-2 font-general max-h-full overflow-y-auto relative">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

export default Sidebar

