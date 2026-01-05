import { useState } from 'react';
import { useLoader } from '~/stores/loaderStore';
import { post } from '~/libs/axios';
import type { AxiosResponse } from 'axios';

interface UseApiFormOptions<TResponse> {
    onSuccess?: (data: TResponse, response: AxiosResponse<TResponse>) => void;
    successMessage: string;
    errorMessage: string;
    isForm?: boolean;
}

export function useApiForm<TRequest, TResponse>({
    onSuccess,
    successMessage,
    errorMessage,
    isForm = false
}: UseApiFormOptions<TResponse>) {
    const { alert } = useLoader();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (endpoint: string, data: TRequest, method: 'POST' | 'PUT' | 'DELETE' = 'POST') => {
        setIsSubmitting(true);
        try {
            const requestData = method !== 'POST' ? { ...data, _method: method } : data;
            const res: AxiosResponse<TResponse> = await post(endpoint, requestData, isForm);

            if (onSuccess) {
                onSuccess(res.data, res);
            }
            alert(successMessage, 5000, 'success');
        } catch (error) {
            alert(errorMessage, 5000, 'error');
            console.error(errorMessage, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submit, isSubmitting };
}