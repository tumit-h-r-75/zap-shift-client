import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecoure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecoure = () => {

    const { user } = useAuth()

    axiosSecoure.interceptors.request.use(config => {
        config.headers.Authorization = `bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error)
    })



    return axiosSecoure;
};

export default useAxiosSecoure;