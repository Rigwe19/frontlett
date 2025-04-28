import { create } from 'zustand'

interface LoaderStore {
    isLoading: boolean
    setLoading: (loading: boolean) => void
    requestCount: number;
    alert: (message: string, duration: number, type:'info' | 'error' | 'warning' | 'success' | 'user') => void;
    isAlertOpened: boolean,
    alertMessage: string
    alertType: 'info' | 'error' | 'warning' | 'success' | 'user'
}

export const useLoader = create<LoaderStore>((set) => ({
    isLoading: false,
    isAlertOpened: false,
    alertType: 'info',
    alertMessage: '',
    requestCount: 0,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    alert: (message: string, duration = 5000, type = 'info') => {
        set({ isAlertOpened: true, alertMessage: message, alertType: type })
        setTimeout(() => {
            set({ isAlertOpened: false })
        }, duration)
    }
}))