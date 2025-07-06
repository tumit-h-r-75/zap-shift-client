import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecoure = axios.create({
    baseURL: `https://zap-shift-server-three.vercel.app`
})

const useAxiosSecoure = () => {

    const { user, signOutUser } = useAuth();
    const navigate = useNavigate()


    axiosSecoure.interceptors.request.use(config => {
        config.headers.Authorization = `bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error)
    })

    axiosSecoure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden')
        }
        else if (status === 401) {
            signOutUser()
                .then(() => {
                    navigate('/auth/login')
                })
                .catch(() => { })
        }
        return Promise.reject(error)
    })

    return axiosSecoure;
};

export default useAxiosSecoure;