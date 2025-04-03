import axios, { AxiosError, type AxiosResponse } from "axios";
import useAuth, { getAuthState } from "../stores/authStore";
import { notification } from "./notification"; // Adjust the import path
import { useLoader } from "~/stores/loaderStore";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    useLoader.setState((state) => ({
        requestCount: state.requestCount + 1,
        isLoading: true
    }))
    return config
})

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        useLoader.setState((state) => ({
            requestCount: state.requestCount - 1,
            isLoading: state.requestCount - 1 > 0
        }))
        return response
    },
    (error) => {
        useLoader.setState((state) => ({
            requestCount: state.requestCount - 1,
            isLoading: state.requestCount - 1 > 0
        }))
        return Promise.reject(error)
    }
)

// Unauthorized interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuth.setState((state: any) => ({
                ...state,
                token: null,
            }));
        }
        return Promise.reject(error);
    }
);

const getAuthHeader = () => {
    const token = getAuthState().token;
    return token ? `Bearer ${token}` : "";
};

interface ValidationError {
    field: string;
    message: string;
}

interface ErrorResponse {
    message?: string;
    errors?: ValidationError[];
}

const handleRequestError = (error: AxiosError<ErrorResponse>, url: string) => {
    const message = error.response?.data?.message;
    const validationErrors = error.response?.data?.errors;

    if (error.response?.status === 422) {
        const validationError = new Error('Validation Failed');
        (validationError as any).validationErrors = validationErrors;
        (validationError as any).status = error.response.status;
        return Promise.reject(validationError);
    } else {
        notification(message ?? `Error while accessing ${url}`, "error");
    }

    return Promise.reject(error);
};

export const get = async <TResponse>(url: string, params?: any): Promise<AxiosResponse<TResponse>> => {
    try {
        return await axiosInstance.get<TResponse>(url, {
            headers: {
                Authorization: getAuthHeader(),
            },
            params: params
        });
    } catch (error) {
        return handleRequestError(error as AxiosError<ErrorResponse>, url);
    }
};

export const post = async <TRequest, TResponse>(
    url: string,
    data?: TRequest
): Promise<AxiosResponse<TResponse>> => {
    try {
        return await axiosInstance.post<TResponse>(url, data ?? {}, {
            headers: {
                Authorization: getAuthHeader(),
            },
        });
    } catch (error) {
        return handleRequestError(error as AxiosError<ErrorResponse>, url);
    }
};

export const put = async <TRequest, TResponse>(
    url: string,
    data: TRequest
): Promise<AxiosResponse<TResponse>> => {
    try {
        return await axiosInstance.put<TResponse>(url, data, {
            headers: {
                Authorization: getAuthHeader(),
            },
        });
    } catch (error) {
        return handleRequestError(error as AxiosError<ErrorResponse>, url);
    }
};

export const deleteRequest = async <TResponse>(
    url: string
): Promise<AxiosResponse<TResponse>> => {
    try {
        return await axiosInstance.delete<TResponse>(url, {
            headers: {
                Authorization: getAuthHeader(),
            },
        });
    } catch (error) {
        return handleRequestError(error as AxiosError<ErrorResponse>, url);
    }
};
