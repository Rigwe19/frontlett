import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router'
import useAuth from '~/stores/authStore'

type Props = {}

const Invite = () => {
    const { code } = useParams<{ code: string }>()
    const { updateCode } = useAuth();
    useEffect(() => {
        if (code) {
            console.log(code)
            updateCode(code)
        }
    }, []);

    return (
        <Navigate to={'/onboarding/get-started'} />
    )
}

export default Invite