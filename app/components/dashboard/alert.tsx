import { AnimatePresence, motion } from "framer-motion";
import { LuCircleCheckBig, LuInfo, LuTriangleAlert, LuOctagonAlert } from "react-icons/lu"
import { PiUserCircleGearDuotone } from "react-icons/pi";
import { useLocation } from "react-router";
import { useLoader } from "~/stores/loaderStore";

// type Props = {
//     icon?: 'info' | 'error' | 'warning' | 'success' | 'user'
// }

const Alert = () => {
    const { alertMessage, isAlertOpened, alertType } = useLoader()
    const path = useLocation().pathname;
    return (
        <div className={`w-full z-50 flex justify-center fixed ${path.includes('dashboard')?'md:top-[80px] md:left-[150px] top-0 left-0':'top-0 left-0'} right-0`}>
            <AnimatePresence>
                {isAlertOpened && 
                (<motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='flex max-w-[492px] w-full p-3 flex-col items-start gap-2.5 rounded-[10px] bg-[#F6F6F6] dark:bg-neutral-700'
                >
                    <div className="flex gap-3 items-center self-stretch">
                        <div className="flex w-10 h-10 justify-center items-center rounded-[50px] bg-[#FFF] dark:bg-neutral-500">
                            {alertType === 'info' && <LuInfo className="w-8 h-8 text-blue-500" />}
                            {alertType === 'success' && <LuCircleCheckBig className="w-7 h-7 text-green-500" />}
                            {alertType === 'error' && <LuTriangleAlert className="w-7 h-7 text-red-500" />}
                            {alertType === 'warning' && <LuOctagonAlert className="w-7 h-7 text-yellow-500" />}
                            {alertType === 'user' && <PiUserCircleGearDuotone className="w-7 h-7 text-neutral-500 dark:text-neutral-300" />}
                        </div>
                        <p className="flex flex-col justify-center text-center text-gray-500 dark:text-neutral-300">{alertMessage}</p>
                    </div>
                </motion.div>)
                }
            </AnimatePresence>

        </div>

    )
}

export default Alert