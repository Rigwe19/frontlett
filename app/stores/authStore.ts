import { create } from "zustand";
import { type AxiosResponse } from "axios";
import { deleteRequest, get, post } from "../libs/axios";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  // workId: string;
  email: string;
  id: string;
  full_name: string;
  referral_code: string;
  username: string;
  phone_number: string;
  phone_verified_at: string;
  location?: string;
  rc_number?: string;
  rc_verified?: boolean;
  invited_count: number;
  invite_tokens: number;
  role: "resource" | "business" | "admin" | "adviser" | "influencer";
  subscription: boolean|null;
  manager: Manager;
  created_at: string;
  profile: Profile;
  percentage_completed: number;
  work_id: string;
  businesses?: Business[];
  accounts: Account[]
};

export type VisitorUser = {
  userId: string;
  full_name: string;
  username: string;
  location?: string;
  profile: {
    profile_picture: string;
    professional_headline: string;
    about: string;
    hourly_rate: number;
    roles: string[];
    skills: string[];
    rating: number;
    job_success_rate: number;
    portfolio?: Array<{
      title: string;
      description: string;
      imageUrl: string;
      projectUrl: string;
    }>;
    workExperience?: Array<{
      title: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    currentWork?: Array<{
      title: string;
      status: "In Progress" | "Completed";
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education?: Array<{
      degree: string;
      institution: string;
      startDate: string;
      endDate: string;
      description?: string;
    }>;
    socialMedia?: Array<{
      platform: string;
      url: string;
    }>;
  };
  availability?: {
    totalHours: number;
    schedule: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
  };
};

interface Profile {
  profile_picture: string;
  about: string;
  professional_headline: string;
  description: string;
  availability: any;
  roles: string[];
  skills: string[];
  rate: number;
  is_completed: boolean;
  steps: number;
  rc: string;
  size: string;
  industry?: string;
  company_name?: string;
  company_location?: string;
}

interface Manager {
  name: string;
  email: string;
}

interface Business {
  id: number;
  company_name: string;
  official_email: string;
  industry: string;
  size?: string;
  description: string;
  address: string;
  country: string;
  state: string;
  website_url: string;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone_number: string;
  cover_photo: string;
  profile_picture: string;
  linkedIn: string;
  github: string;
  twitter: string;
  other: string;
  is_completed: string;
  location?: string;
  rc?: string;
  is_verified?: boolean;
  created_at: string;
}

interface ResetPasswordPayload {
  email: string;
  password: string;
  token: string;
  password_confirmation: string;
}
interface Account {
  profile_picture: string;
  name: string;
  role: string;
  desc: string;
  id: number;
  active: boolean;
}
interface UseAuthStore {
  user: User | null;
  token: string | null;
  updateToken: (token: string) => void;
  invite_code: string;
  updateCode: (code: string) => void;
  number: string;
  step: number;
  updateStep: (step: number) => void;
  updateNumber: (code: string) => void;
  signIn: (form: { email: string; password: string }) => Promise<any>;
  fetchCurrentUser: () => Promise<void>;
  register: (details: any) => Promise<any>;
  updateUser: (user: any) => void;
  logout: () => Promise<void>;
  // google: (state: {code: string, mode: 'register' | 'login', redirectUrl: string, state?: string|null}, details?: any) => Promise<void>;
  google: (details?: any) => Promise<{ success: boolean; url: string }>;
  sendResetLink: (email: string) => Promise<any>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<any>;
}
interface AuthResponse {
  code: number;
  error: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
  errors?: [];
}
interface ValidationError {
  field: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const useAuth = create<UseAuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      updateToken: (token: string) => set({ token }),
      invite_code: "",
      updateCode: (code: any) => set({ invite_code: code }),
      number: "",
      updateNumber: (number: any) => set({ number: number }),
      step: 0,
      updateStep: (number: any) => set({ step: number }),
      signIn: async (form: {
        email: string;
        password: string;
      }): Promise<any> => {
        try {
          const response: AxiosResponse = await post(`/auth/login`, {
            email: form.email,
            password: form.password,
          });

          // const userData = response.data;
          // console.log(response.data);
          set({ token: response.data.token, user: response.data.user });
          if (!response.data.user.phone_verified_at) {
            set({ number: response.data.user.phone_number });
          }
          // console.log("SETUP", { user: response.data.user });
          return Promise.resolve({
            success: response.data.success,
            verified: response.data.user.phone_verified_at,
          });
        } catch (error: any) {
          if (error.status === 422) {
            const validationErrors: FormErrors = {};
            for (const err in error.validationErrors) {
              validationErrors[err] = error.validationErrors[err][0];
            }
            return Promise.reject(validationErrors);
            // console.log(validationErrors)
            // setErrors(validationErrors);
          } else if (error.status === 419) {
            return Promise.reject({ username: "Invalid username or password" });
          }
          console.log(error);
          // Handle authentication errors
        }
      },
      fetchCurrentUser: async (): Promise<void> => {
        try {
          const response: AxiosResponse = await get(`/auth/user`);

          const userData = response.data;

          set({ user: response.data.user });
        } catch (error: unknown) {
          console.log(error);
          // Handle authentication errors
        }
      },
      updateUser: (user: any) =>
        set((state: { user: any }) => ({
          user: { ...state.user, ...user },
        })),
      register: async (details: any): Promise<any> => {
        try {
          const response: AxiosResponse = await post(`/auth/register`, details);

          // const userData = response.data.data;

          set({ token: response.data.token, user: response.data.user });
          return Promise.resolve(response.data.success);
          // console.log("SETUP", { token: userData.token });
        } catch (error: any) {
          if (error.status === 422) {
            const validationErrors: FormErrors = {};
            for (const err in error.validationErrors) {
              validationErrors[err] = error.validationErrors[err][0];
            }
            return Promise.reject(validationErrors);
          } else if (error.status === 419) {
            return Promise.reject({ username: "Invalid username or password" });
          }
          // Handle authentication errors
        }
      },
      logout: async () => {
        try {
          const response: AxiosResponse = await deleteRequest(`/auth/logout`);
          if (response.data.success) {
            set({ token: null });
          }

          // console.log("SETUP", { token: userData.token });
        } catch (error: any) {
          // Handle authentication errors
        }
      },
      google: async (details) => {
        try {
          // const response: AxiosResponse = await get("/auth/google/callback", { ...state, ...details })
          const response: AxiosResponse = await post(
            `/auth/google/callback`,
            details
          );

          // const userData = response.data.data;

          set({ token: response.data.token, user: response.data.user });
          return Promise.resolve(response.data.success);
          // console.log("SETUP", { token: userData.token });
        } catch (error: any) {
          if (error.status === 422) {
            const validationErrors: FormErrors = {};
            for (const err in error.validationErrors) {
              validationErrors[err] = error.validationErrors[err][0];
            }
            return Promise.reject(validationErrors);
          } else if (error.status === 419) {
            return Promise.reject({ username: "Invalid username or password" });
          }
          // Handle authentication errors
        }
      },
      //forget password
      sendResetLink: async (email: string) => {
        try {
          const response: AxiosResponse = await post("/auth/forgot-password", {
            email,
          });
          return Promise.resolve(response.data?.success);
        } catch (error: any) {
          if (error.status === 422) {
            const validationErrors: FormErrors = {};
            for (const err in error.validationErrors) {
              validationErrors[err] = error.validationErrors[err][0];
            }
            return Promise.reject(validationErrors);
          }
          return Promise.reject({
            email: "Failed to send reset link. Please try again.",
          });
        }
      },
      //reset password
      resetPassword: async ({
        email,
        password,
        token,
        password_confirmation,
      }) => {
        try {
          const response: AxiosResponse = await post("/auth/reset-password", {
            email,
            password_confirmation,
            password,
            token,
          });

          const { success } = response.data;
          return Promise.resolve(success);
        } catch (error: any) {
          if (error.status === 422) {
            const validationErrors: FormErrors = {};
            for (const err in error.validationErrors) {
              validationErrors[err] = error.validationErrors[err][0];
            }
            return Promise.reject(validationErrors);
          }
          return Promise.reject({ general: "Failed to reset password" });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state: UseAuthStore) => ({
        token: state.token,
        user: state.user,
        number: state.number,
        // isActivated: state.isActivated,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuth;

// Export a way to get state directly
export const getAuthState = () => useAuth.getState();
