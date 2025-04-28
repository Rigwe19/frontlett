import React, { useState, type PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LuX } from 'react-icons/lu';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    desc?: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ isOpen, onClose, title, desc, children }) => {
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom={isMobile ? 'translate-y-full' : 'opacity-0 scale-95'}
                        enterTo={isMobile ? 'translate-y-0' : 'opacity-100 scale-100'}
                        leave="ease-in duration-200"
                        leaveFrom={isMobile ? 'translate-y-0' : 'opacity-100 scale-100'}
                        leaveTo={isMobile ? 'translate-y-full' : 'opacity-0 scale-95'}
                    >
                        <Dialog.Panel
                            className={`${isMobile ? 'w-full max-w-md' : 'w-full max-w-lg'
                                } bg-white dark:bg-neutral-700 shadow-xl transform transition-all ${isMobile ? 'fixed bottom-0 rounded-t-[20px]' : 'rounded-[20px]'
                                }`}
                        >
                            <div className="flex w-full flex-col items-start gap-3 p-6">
                                <div className="flex justify-between items-start self-stretch">
                                    <p className="flex flex-col justify-center text-lg font-medium">{title}</p>
                                    <button type="button" onClick={onClose} className="flex w-[24px] h-[24px] justify-center items-center bg-[rgba(0,_0,_0,_0.00)]">
                                        <LuX />
                                    </button>
                                </div>
                                {desc && <span className="self-stretch text-[#64748B] dark:text-neutral-400 text-[14px] -mt-2">{desc}</span>}
                                {children}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;