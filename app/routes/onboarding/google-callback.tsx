import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router';
import { get } from '~/libs/axios';
import useAuth from '~/stores/authStore';

type Props = {}

const GoogleCallback = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { updateUser, updateToken } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        redirect()
    }, []);
    const redirect = async () => {
        const code = searchParams.get('code');
        const scope = searchParams.get('scope');
        const state = searchParams.get('state');
        // const state = window.location.search.split('=')[1];
        // const code = window.location.search.split('&')[1].split('=')[1];
        // const scope = window.location.search.split('&')[2].split('=')[1];
        if (!code || !state) {
            console.error('Missing required OAuth parameters');
            navigate('/login'); // Redirect to login page if parameters are missing
            return;
        }
        await get<{ success: boolean, path: string, token: string, user: any }>('/auth/google/callback', {
            code, scope, state
        }).then(res => {
            const { success, path, token, user } = res.data
            if (success) {
                updateToken(token)
                updateUser(user)
                navigate(path)
            }
        })
    }
    return (
        <div>GoogleCallback</div>
    )
}

export default GoogleCallback