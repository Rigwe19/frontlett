import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BusinessDetails {
  industry?: string;
  size?: string;
  description?: string;
  address?: string;
  country?: string;
  state?: string;
  official_email?: string;
  website_url?: string;
}

interface ContactPerson {
  contact_name?: string;
  contact_role?: string;
  contact_email?: string;
  contact_phone_number?: string;
}

interface Social {
  linkedIn?: string;
  twitter?: string;
  github?: string;
  other?: string;
}

interface ProfileMedia {
  profile_picture?: File | null;
  cover_photo?: File | null;
}

interface EmployerOnboardingStore {
  business: BusinessDetails;
  contact: ContactPerson;
  media: ProfileMedia;
  social: Social;
  updateBusiness: (data: BusinessDetails) => void;
  updateContact: (data: ContactPerson) => void;
  updateMedia: (data: ProfileMedia) => void;
  updateSocial: (data: Social) => void;
  reset: () => void;
}
const useEmployerOnboardingStore = create<EmployerOnboardingStore>()(
  persist(
    (set) => ({
      business: {},
      contact: {},
      media: {},
      social: {
        linkedIn: "",
      },
      updateBusiness: (data) =>
        set((state) => ({ business: { ...state.business, ...data } })),
      updateContact: (data) =>
        set((state) => ({ contact: { ...state.contact, ...data } })),
      updateMedia: (data: Partial<ProfileMedia>) =>
        set((state) => ({ media: { ...state.media, ...data } })),
      updateSocial: (data: Partial<Social>) =>
        set((state) => ({ social: { ...state.social, ...data } })),
      reset: () => set({ business: {}, contact: {}, media: {} }),
    }),
    {
      name: "employee-storage",
      partialize: (state: EmployerOnboardingStore) => ({
        business: state.business,
        contact: state.contact,
        media: state.media,
        social: state.social,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useEmployerOnboardingStore;
