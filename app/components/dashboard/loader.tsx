import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigation } from 'react-router';

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
    if (isLoading) return <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.05 }}
            className={`items-center justify-center absolute z-[9999] inset-0 ${isOnboarding ? 'pointer-events-auto' : 'pointer-events-none'} bg-black/50 ${show ? 'flex' : 'hidden'}`}
        >
            <span className="loader"></span>
        </motion.div>
    );
};

export default Loader;