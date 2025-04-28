import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigation } from 'react-router';
import 'animate.css';

interface LoaderProps {
    show: boolean;
}

const Loader = ({ show }: LoaderProps) => {
    const location = useLocation();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (navigation.state === 'loading') {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [navigation.state]);
    const isOnboarding = location.pathname.includes('onboarding');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (show) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'unset'
            }
        }
    }, [show,]);
    // if (isLoading) return <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.05 }}
            className={`items-center justify-center absolute z-[9999] inset-0 ${isOnboarding ? 'pointer-events-auto' : 'pointer-events-none'} bg-black/60 ${(show||isLoading) ? 'flex' : 'hidden'}`}
        >
            <div className="flex justify-center items-enter h-12 w-12 md:h-24 md:w-24 rounded-full">
                <img src="/images/loader.png" className="animate__animated animate__rubberBand animate__infinite w-11/12 aspect-square" alt="" />
            </div>
            {/* <span className="loader"></span> */}
        </motion.div>
    );
};

export default Loader;