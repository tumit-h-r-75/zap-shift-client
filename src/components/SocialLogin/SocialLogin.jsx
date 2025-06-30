import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

import { FcGoogle } from 'react-icons/fc';
import useAxios from '../../hooks/useAxios';

const SocialLogin = () => {

    const from = location.state?.from?.pathname || "/";

    const { googleSigneIn } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxios()




    const handleGoogleLogin = () => {
        googleSigneIn()
            .then(async (res) => {

                console.log(res);
                const user = res.user

                // update user info inthe data base 
                const userInfo = {
                    email: user.email,
                    role: "user", //defoult role
                    createdAt: new Date().toISOString(),
                    last_log_In: new Date().toISOString()
                }
                const userRes = await axiosInstance.post('/users', userInfo)
                console.log('user update info',userRes.data);

                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center justify-center gap-2">
            <FcGoogle className="text-xl" /> Login with Google
        </button>
    );
};

export default SocialLogin;