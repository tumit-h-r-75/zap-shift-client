import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';

const SocialLogin = () => {
    const { googleSigneIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const axiosInstance = useAxios();

    const handleGoogleLogin = async () => {
        try {
            const res = await googleSigneIn();
            const user = res.user;

            // prepare user data
            const userInfo = {
                email: user.email,
                role: 'user',
                createdAt: new Date().toISOString(),
                last_log_In: new Date().toISOString()
            };

            await axiosInstance.post('/users', userInfo);
            toast.success('Login successful!');

            // ✅ redirect to previous page or home
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Google Sign In failed!');
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
            <FcGoogle className="text-xl" /> Login with Google
        </button>
    );
};

export default SocialLogin;
