import { create } from 'zustand'

interface LoaderStore {
    isLoading: boolean
    setLoading: (loading: boolean) => void
    requestCount: number
}

export const useLoader = create<LoaderStore>((set) => ({
    isLoading: false,
    requestCount: 0,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
}))