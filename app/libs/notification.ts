import { toast } from 'react-toastify';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const notification = (message: string, type: NotificationType) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};