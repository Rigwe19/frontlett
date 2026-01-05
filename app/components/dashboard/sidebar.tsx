import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMediaQuery } from "@uidotdev/usehooks"
import { AnimatePresence, motion, useMotionValue, useSpring, useVelocity } from 'framer-motion'
import { useState, type FC } from "react"
import { useForm } from "react-hook-form"
import {
    LuBell,
    LuBriefcase,
    LuCalculator,
    LuChartPie,
    LuChevronDown,
    LuCopy,
    LuCreditCard,
    LuDollarSign,
    LuFileText,
    LuGift,
    LuGraduationCap,
    LuLayoutDashboard,
    LuLink2,
    LuListTodo,
    LuLogOut,
    LuMenu,
    LuMessageCircleQuestion,
    LuMessageSquare,
    LuMonitor,
    LuPlus,
    LuSettings,
    LuShare,
    LuShare2,
    LuShield,
    LuShieldCheck,
    LuUser,
    LuUserCog,
    LuUsers,
    LuWallet,
    LuX
} from "react-icons/lu"
import { TbAffiliate } from 'react-icons/tb'
import { Link, NavLink, Outlet, useNavigate } from "react-router"
import * as yup from "yup"
import { post } from "~/libs/axios"
import useAuth from "~/stores/authStore"
import { useLoader } from "~/stores/loaderStore"
import Button from "../ui/button"
import Input from "./input"
import { RiShoppingBag4Line } from "react-icons/ri"
import { PiUsersThree } from "react-icons/pi"
import NewAccount from "./new-account"
import ShareProfileModal from "../share-profile-modal"

interface SidebarProps {
    activePage: string
}

const schema = yup
    .object({
        work_id: yup
            .string()
            .required(),
    })
    .required();

const asideWidth = 340;
const Sidebar: FC<SidebarProps> = ({ activePage }) => {
    // Use React state to control open/close for details
    const [affiliateOpen, setAffiliateOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { user, logout, updateUser } = useAuth();
    const { alert } = useLoader()
    const navigate = useNavigate();
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");
    const [isOpen, setIsOpen] = useState(false);
    const [openWork, setOpenWork] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [error, setError] = useState('');
    const x = useMotionValue(-asideWidth);
    const spring = useSpring(x, {
        stiffness: 100,
        damping: 15
    })
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
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
        // { icon: <LuLayoutDashboard size={20} />, label: "Dashboard", path: '/dashboard', id: "dashboard", disabled: false },
        { icon: <LuUser size={20} />, label: "Account Profile", path: `/dashboard/profile`, id: "profile", disabled: false },
        { icon: <LuFileText size={20} />, label: "Contract", path: '/dashboard/coming-soon', id: "messages", disabled: false },
        { icon: user?.role === 'business' ? <LuShield size={20} /> : <LuShieldCheck size={20} />, label: user?.role === 'business' ? "Safe Business" : "Vetted Pro", path: '/dashboard/coming-soon', id: "vetted", disabled: false },
        { icon: <LuUserCog size={20} />, label: "Account Officer", path: '/dashboard/account-officer', id: "account-officer", disabled: false },
        { icon: <PiUsersThree size={20} />, label: "Community", path: '/dashboard/coming-soon', id: "community", disabled: false },
    ]

    const leadItems = [
        { icon: <LuBriefcase size={20} />, label: `${user?.role === 'business' ? 'Business' : 'Work'} Profiles`, path: '/dashboard/coming-soon', id: "jobs", disabled: false },
        { icon: <LuMonitor size={20} />, label: "Virtualt Jobs", path: '/dashboard/coming-soon', id: "virtualt", disabled: false },
        { icon: <LuListTodo size={20} />, label: "Virtualtlance Task", path: '/dashboard/coming-soon', id: "virtualtlance", disabled: false },
        { icon: <LuGraduationCap size={20} />, label: "Learning", path: '/dashboard/coming-soon', id: "learning", disabled: false },
        { icon: <LuChartPie size={20} />, label: "Reviews & Analytics", path: '/dashboard/coming-soon', id: "reviews", disabled: false },
    ]

    const projectItems = [
        { icon: <LuCalculator size={20} />, label: "Salary Calculator", path: '/dashboard/coming-soon', id: "salary", disabled: false },
        { icon: <LuDollarSign size={20} />, label: "Plan & Pricing", path: '/dashboard/pricing', id: "plan", disabled: false },
        { icon: <LuCreditCard size={20} />, label: "Device & Payday Loan", path: '/dashboard/coming-soon', id: "device", disabled: false },
        { icon: <LuLink2 size={20} />, label: "Affiliate", id: "affiliate", disabled: false },
        { icon: <LuWallet size={20} />, label: "Escrow Wallet & Bank", path: '/dashboard/coming-soon', id: "wallet", balance: "0.00", disabled: false },
    ]

    const bottomItems = [
        { icon: <LuSettings size={20} />, label: "Settings", id: "settings", disabled: false, path: '/dashboard/coming-soon', onClick: () => { } },
        { icon: <LuLogOut size={20} />, label: "Logout", id: "logout", button: true, onClick: logout },
    ]

    const handleClose = (path: string | null = null) => {
        if (path) {
            navigate(path)
        }
        setIsOpen(false)
    }

    const handleCopy = (type: string = "link") => {
        let link = "";
        if (type === "link") {
            link = `${window.location.origin}/invite/${user?.referral_code}`;
        } else {
            link = user?.work_id ?? ' '
        }

        navigator.clipboard.writeText(link).then(() => {
            alert(`${link === 'link' ? "Link" : 'Work Id'} copied to clipboard`, 5000, 'success');
        }).catch(() => {
            alert(`Failed to copy ${link === 'link' ? "link" : 'work id'}`, 5000, 'error');
        });
    }

    const onSubmit = async (data: { work_id: string }) => {
        await post<any, any>('/profile/work-id', { id: data.work_id })
            .then(res => {
                const { success, user } = res.data;
                setIsSuccess(success)
                setTimeout(() => {
                    setIsSuccess(false)
                }, 5000)
                if (success) {
                    updateUser(user)
                }
            })
            .catch(err => {

            })
    }
    const handleActive = async (id: number, type: string) => {
        await post<any, any>('/profile/activate', { id, type })
            .then(res => {
                const { success, user } = res.data;
                if (success) {
                    updateUser(user)
                    if(type === 'business'){
                        navigate("/dashboard/complete-profile")
                    }else{
                        navigate("/dashboard/complete-profile/core-information")
                    }
                }
            })
            .catch(err => {

            })
    }

    const handleAddAccount = async(data:any) => {
        await post<any, any>('/profile/add', data)
            .then(res => {
                const { success, user } = res.data;
                if (success) {
                    updateUser(user)
                    if(data.role === 'business'){
                        navigate("/dashboard/complete-profile")
                    }else{
                        navigate("/dashboard/complete-profile/core-information")
                    }
                }
            })
            .catch(err => {

            })
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
                    className={`min-w-80 w-80 max-h-screen h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary ${!isMobile ? 'flex' : isOpen ? 'flex translate-x-0 z-10' : 'hidden -translate-x-full'} border-r border-gray-200 absolute md:relative top-0 left-0 dark:border-neutral-700 flex-col bg-white dark:bg-neutral-900`}>
                    {/* Logo */}
                    <div className="p-4 border-b border-b-gray-200 dark:border-b-neutral-700">
                        <img src="/logo.png" alt="Frontlett Logo" className="h-10 mx-auto dark:hidden" />
                        <img src="/logo-white.svg" alt="Frontlett Logo" className="h-10 mx-auto dark:block hidden" />
                    </div>

                    {/* LuUser Profile */}
                    <Menu as="div" className="relative px-3 my-4">
                        <MenuButton className="w-full p-4 bg-blue-50 dark:bg-neutral-800 rounded-lg flex items-center justify-between">
                            <div className="flex items-center w-full">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                                    <img src={user?.profile?.profile_picture ? (import.meta.env.VITE_BASE_SERVICE_URL + user?.profile?.profile_picture) : "/images/avatar.png"} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="ml-3 text-left">
                                    <h3 className="">{user?.role !== 'business' ? user?.full_name : user?.profile?.company_name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-1">{user?.profile?.professional_headline ?? user?.profile?.description}</p>
                                </div>
                            </div>
                            <LuChevronDown />
                        </MenuButton>

                        <AnimatePresence>
                            <MenuItems
                                as={motion.div}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                // transition={{ duration: 0.2 }}
                                className="absolute left-3 right-3 z-10 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700"
                            >
                                {user?.accounts?.length !== 0 && <div className="p-2">
                                    {user?.accounts?.map((business) => (
                                        <MenuItem key={business.id}>
                                                <button
                                                    onClick={() => handleActive(business.id, business.role)}
                                                    className={`${business.active ? 'bg-blue-50 dark:bg-neutral-700' : ''
                                                        } flex items-center w-full p-2 rounded-md text-left`}
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0">
                                                        <img
                                                            src={business.profile_picture ? (import.meta.env.VITE_BASE_SERVICE_URL + business?.profile_picture) : "/images/avatar.png"}
                                                            alt={''}
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium">{business.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-1">{business.desc}</p>
                                                    </div>
                                                </button>
                                        </MenuItem>
                                    ))}
                                </div>}

                                <div className="border-t border-gray-200 dark:border-neutral-700 p-2">
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                            onClick={()=>setOpenAdd(true)}
                                                className={`${active ? 'bg-blue-50 dark:bg-neutral-700' : ''
                                                    } flex items-center w-full p-2 rounded-md text-left`}
                                            >
                                                <LuPlus className="w-5 h-5 mr-2" />
                                                <span>Add Account</span>
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </AnimatePresence>
                    </Menu>
                    <NewAccount open={openAdd} onClose={()=>setOpenAdd(false)} onSubmit={e=>handleAddAccount(e)} />
                    <ShareProfileModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
                    {/* Affiliate Section */}
                    {/* <div className="px-3 my-4">

                    </div> */}
                    {/* Main Navigation */}
                    <nav className="flex-1 px-3">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${location.pathname === '/dashboard' ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-400"
                                }`}
                        >
                            <span className="mr-3"><LuLayoutDashboard size={20} /></span>{/**/}
                            Dashboard
                        </NavLink>
                        <h3 className="px-3 mt-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">profile</h3>
                        <ul className="mt-2 space-y-1">
                            {navItems.map((item) => (
                                <li key={item.id} className={`${item.disabled ? 'pointer-events-none' : 'pointer-events-auto'} rounded-[10px]`}>
                                    <NavLink
                                        onClick={() => handleClose()}
                                        to={item.path}
                                        className={({ isActive }) => `flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-400"
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
                            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">jobs</h3>
                            <ul className="mt-2 space-y-1">
                                {leadItems.map((item) => (
                                    <li key={item.id} className={`${item.disabled ? 'pointer-events-none' : 'pointer-events-auto'} rounded-[10px]`}>
                                        <NavLink
                                            onClick={() => handleClose()}
                                            to={item.path}
                                            className={({ isActive }) => `flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-400"
                                                }`}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            {item.label}
                                        </NavLink>
                                    </li>
                                    ))}
                            </ul>
                        </div>

                        {/* PROJECTS & PAYMENTS Section */}
                        <div className="mt-8">
                            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payments</h3>
                            <ul className="mt-2 space-y-1">
                                {projectItems.map((item) => {
                                    if (item.id !== 'affiliate') {
                                        return (<li key={item.id} className={`${item.disabled ? 'pointer-events-none' : 'pointer-events-auto'} rounded-[10px]`}>
                                            <NavLink
                                                onClick={() => handleClose(item.path ?? undefined)}
                                                to={item.path ?? ''}
                                                className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 text-sm font-medium group rounded-md w-full ${location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-400"
                                                    }`}
                                            >
                                                <div className="flex gap-1">
                                                    <span className="mr-3">{item.icon}</span>
                                                    <span className="flex-1 flex-nowrap">{item.label}</span>
                                                </div>
                                                {item.balance && <div className="flex gap-0.5">
                                                    <span className="text-xs text-gray-500 dark:text-neutral-400 group-hover:dark:text-neutral-500 font-sans">₦</span>
                                                    <span className="text-xs text-gray-500 dark:text-neutral-400 group-hover:dark:text-neutral-500">{item.balance}</span>
                                                </div>}
                                        </NavLink>
                                        </li>)
                                    } else {
                                        return (
                                            <details
                                                key={item.id}
                                                className="group"
                                                open={affiliateOpen}
                                                onToggle={e => {
                                                    setAffiliateOpen((e.target as HTMLDetailsElement).open);
                                                }}
                                            >
                                                <summary className="flex items-center justify-between cursor-pointer px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-400 transition">
                                                    <span className="flex items-center gap-1">
                                                        <TbAffiliate className="mr-3" size={20} />
                                                        <span className="font-medium text-sm">Affiliate</span>
                                                    </span>
                                                    <svg className="w-4 h-4 ml-2 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </summary>
                                                <AnimatePresence initial={false}>
                                                    {affiliateOpen && (
                                                        <motion.div
                                                            key="affiliate-content"
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden mt-2 bg-blue-50 dark:bg-neutral-800 rounded-lg p-4 flex flex-col gap-3"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-gray-500 dark:text-neutral-300">Invite link:</span>
                                                                <button
                                                                    onClick={() => handleCopy("link")}
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
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </details>
                                        )
                                    }
                                }
                                )}
                            </ul>
                        </div>
                    </nav>

                    {/* Bottom Items */}
                    <div className="px-3 py-4 mt-4 border-t border-t-gray-200 dark:border-t-neutral-700">
                        <ul className="space-y-1">
                            {bottomItems.map((item) => (
                                <li key={item.id} className={`${item.disabled ? 'pointer-events-none' : 'pointer-events-auto'} rounded-[10px]`}>
                                    <button
                                        // href={`#${item.id}`}
                                        onClick={() => { handleClose(item.path); item.onClick && item.onClick() }}
                                        className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${location.pathname === item.path
                                            ? "bg-blue-600 text-white"
                                            : item.id === "logout"
                                                ? "text-red-500 hover:bg-red-50"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-400"
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
                <nav className="h-[73px] py-4 px-4 bg-white dark:bg-neutral-900 w-full flex justify-end md:justify-between items-center">
                    <ul className="flex gap-4 md:flex hidden">
                        <li className="px-3 py-2 flex gap-2.5 items-center">
                            <LuGift color="#1279E0" />
                            <span className="text-[#1279E0]">Offers & Bonuses</span>
                        </li>
                        <li className="px-3 py-2 flex gap-2.5 items-center">
                            <RiShoppingBag4Line color="#1279E0" />
                            <span className="text-[#1279E0]">Marketplace</span>
                        </li>
                    </ul>
                    <div className="flex gap-3">
                        <ul className="w-full gap-4 justify-end items-center flex">
                            <li className="rounded-full md:flex hidden border border-[#E5E7EB] dark:border-neutral-700 px-3.5 py-2">
                                {user?.role !== 'business' && <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-2 items-center">
                                    Get discovered{/**/}
                                    <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span>
                                </button>}
                                {user?.role === 'business' && <button className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                    Hire Resources
                                    <LuPlus />
                                    {/* <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span> */}
                                </button>}
                            </li>
                            {user?.role !== 'business' && <li className="rounded-full md:flex hidden border border-[#E5E7EB] bg-[#F3F4F6] dark:bg-neutral-800 dark:border-neutral-700 px-3.5 py-2">
                                <button onClick={() => setOpenWork(true)} className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                    {user?.work_id ? user?.work_id : "Work ID"}
                                </button>
                            </li>}
                            <li className="">
                                <LuBell size={20} className="text-[#6B7280] dark:text-neutral-300" />
                            </li>
                            <li className="">
                                <LuMessageSquare size={20} className="text-[#6B7280] dark:text-neutral-300" />
                            </li>
                            <li className="">
                                <Menu>
                                    <MenuButton className="flex gap-2 items-center">
                                        {!user?.profile?.profile_picture && <span className="rounded-full size-8 border border-[#E5E7EB] bg-[#F3E8FF] justify-center dark:bg-neutral-600 dark:border-neutral-500 text-sm text-[#374151] dark:text-neutral-300 flex gap-2 items-center">
                                            {user?.role !== 'business' && user?.full_name?.charAt(0)?.toUpperCase()}
                                            {user?.role === 'business' && user?.profile?.company_name?.charAt(0)?.toUpperCase()}
                                        </span>}
                                        {user?.profile?.profile_picture && <img className="size-8 rounded-full border border-[#E5E7EB] bg-[#F3E8FF] dark:bg-neutral-600 dark:border-neutral-500" src={import.meta.env.VITE_BASE_SERVICE_URL + user?.profile?.profile_picture} />}
                                        <LuChevronDown />
                                    </MenuButton>
                                    <MenuItems anchor="bottom" className="flex pb-4 flex-col items-start shrink-0 bg-white dark:bg-neutral-800 shadow-[0px_314px_88px_0px_rgba(0,0,0,0.00),0px_201px_80px_0px_rgba(0,0,0,0.01),0px_113px_68px_0px_rgba(0,0,0,0.05),0px_50px_50px_0px_rgba(0,0,0,0.09),0px_13px_28px_0px_rgba(0,0,0,0.10)] rounded-lg">
                                        <MenuItem>
                                            <span className="flex h-10 pl-5 w-full items-center gap-5 shrink-0 text-sm font-medium data-focus:bg-primary leading-5 text-[#0F1729] dark:text-neutral-200">
                                                <LuSettings size={18} />
                                                Settings
                                            </span>
                                        </MenuItem>
                                        <MenuItem>
                                            <button onClick={() => setIsShareModalOpen(true)} className="flex h-10 pl-5 w-full items-center gap-5 shrink-0 text-sm font-medium data-focus:bg-primary leading-5 text-[#0F1729] dark:text-neutral-200 text-left">
                                                <span className="flex items-center gap-5">
                                                    <LuShare2 size={18} />
                                                    Share Profile
                                                </span>
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <span className="flex h-10 pl-5 w-full mb-1 items-center gap-5 shrink-0 text-sm font-medium data-focus:bg-primary leading-5 text-[#0F1729] dark:text-neutral-200">
                                                <LuMessageCircleQuestion size={18} />
                                                Supports
                                            </span>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="/dashboard/account-officer" className="flex mx-5 min-w-[214px] items-center gap-[13.208px] bg-[#F5F8FF] dark:bg-neutral-600 px-[9.906px] py-0.5 rounded-[19.812px]">
                                                <img
                                                    src="/images/avatar.png"
                                                    alt="" className="size-[23px] rounded-full" />
                                                <div className="flex flex-col items-start shrink-0">
                                                    <h2 className="h-[21.111px] self-stretch text-[#0F1729] dark:text-neutral-200 font-medium leading-[21.111px]">{user?.manager?.name}</h2>
                                                    <p className="h-[16.889px] text-[13.051px] font-normal leading-[16.889px]">Account Manager</p>
                                                </div>
                                            </Link>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </li>
                        </ul>
                        <ul className="flex gap-4 justify-end items-center md:hidden">
                            <li className="rounded-full">
                                <button onClick={handleToggleAside} className="text-sm text-[#374151] dark:text-neutral-300 flex gap-1 items-center">
                                    <LuMenu size={32} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="py-2 md:px-4 px-2 font-general max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary relative">
                    <Outlet />
                </main>
            </div>
            <AnimatePresence>
                {openWork && <div className="w-full fixed inset-0">
                    <div onClick={() => setOpenWork(false)} className="absolute inset-0 bg-black/60"></div>
                    <motion.aside
                        // style={{ x: spring }}
                        initial={{ x: 384 }}
                        animate={{ x: openWork ? 0 : 384 }}
                        exit={{ x: 384 }}
                        transition={{ duration: 0.5 }} className="min-w-[384px] flex flex-col justify-between h-full bg-white dark:bg-neutral-800 right-0 absolute p-6 pb-7 z-10 border-l border-[E2E8F0] dark:border-neutral-500">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <h2 className="leading-7 text-[20px] font-bold text-[#0F1729] dark:text-neutral-200">Manage Work Data ID</h2>
                                    <div className="px-2.5 gap-2.5 rounded-full bg-[#DCFCE7]">
                                        <span className="text-[#166534] text-xs leading-4">🟢 Online</span>
                                    </div>
                                </div>
                                <LuX onClick={() => setOpenWork(false)} size={16} />
                            </div>
                            <div className="flex flex-col gap-6">
                                {!isSuccess && !user?.work_id && <form
                                    onSubmit={handleSubmit(onSubmit)} className="border flex flex-col rounded-md p-4 gap-4 dark:border-neutral-500 border-[#E2E8F0]">
                                    <Input
                                        {...register("work_id")}
                                        error={errors.work_id?.message} label="Link Existing ID" placeholder="Enter Work Data ID" />
                                    <Button className="h-10">Validate & Link</Button>
                                    <p className="text-sm leading-5 text-center">Don’t have a WorkID Data <a href="http://workdata.frontlett.com/" target="_blank" className="font-semi-bold text-primary">Create One</a></p>
                                </form>}
                                {isSuccess && <div className="w-2/3 gap-4 flex flex-col self-center mt-40">
                                    <img src="/images/work-id-success.png" alt="work id success" className="w-full" />
                                    <div className="space-y-1 text-center">
                                        <h2 className="text-xl font-medium text-[#001527] dark:text-neutral-200">ID Linked Successfully</h2>
                                        <p className="text-sm text-[#64748B] dark:text-neutral-400">Your Work ID has been successfully linked</p>
                                    </div>
                                </div>}
                                {!isSuccess && !!user?.work_id && <div className="flex w-full flex-col items-start gap-2.5 border border-slate-200 dark:border-neutral-500 px-4 py-[17px] rounded-xl border-solid mt-20">
                                    <div className="flex flex-col items-start gap-12 self-stretch">
                                        <h2 className="h-6 self-stretch text-[#0F1729] dark:text-neutral-200 text-[16.107px] font-semibold leading-6">Active Work Data ID</h2>
                                        <div className="flex flex-col items-start gap-6 self-stretch">
                                            <div className="flex flex-col items-start gap-6 self-stretch">
                                                <div className="flex flex-col items-start gap-2.5 self-stretch bg-[#F8FAFC] dark:bg-neutral-600 p-4 rounded-xl">
                                                    <div className="flex flex-col items-start gap-1 self-stretch">
                                                        <h2 className="text-[#0F1729] dark:text-neutral-200 text-[18.158px] font-bold leading-7">{user?.work_id}</h2>
                                                        <span className="text-slate-500 dark:text-neutral-400 text-[13.702px] font-normal leading-5">Linked to: {user?.full_name}</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center self-stretch pr-px">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleCopy('work_id')} className="flex items-center gap-2.5 border border-slate-200 dark:border-neutral-500 bg-white dark:bg-neutral-700 px-[31px] py-2.5 rounded-[10px]">
                                                            <LuCopy />
                                                            Copy ID
                                                        </button>
                                                        <button className="flex items-center gap-2.5 border border-slate-200 dark:border-neutral-500 bg-white dark:bg-neutral-700 px-[31px] py-2.5 rounded-[10px]">
                                                            <LuShare />
                                                            Share
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                {/* <div className="border flex flex-col p-4 gap-7 rounded-md dark:border-neutral-500 border-[#E2E8F0]">
                                <div className="space-y-2">
                                    <h2 className="font-medium text-[#0F1729] dark:text-neutral-200 leading-6">Generate New ID</h2>
                                    <p className="text-[#64748B] text-sm leading-5 dark:text-neutral-400">This will create a new unique ID.</p>
                                </div>
                                    <Button variant="outline" className="text-[#0F1729] h-10 dark:text-neutral-200 border-[#64748B] dark:border-neutral-500 w-full">Generate New ID</Button>
                            </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-primary text-sm leading-5">Need help? Contact Support</span>
                            <div className="border-t border-[#E2E8F0] dark:border-neutral-500 pt-3">
                                <button className="w-full flex justify-between p-2 rounded-[10px]">
                                    <span className="text-sm leading-5 text-[#0F1729] dark:text-neutral-200">View ID History</span>
                                    <LuChevronDown className="text-[#0F1729] dark:text-neutral-200" />
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                </div>}
            </AnimatePresence>

        </div>

    )
}

export default Sidebar
