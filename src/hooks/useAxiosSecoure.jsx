import axios from 'axios';
import React from 'react';

const axiosSecoure = axios.create({
    baseURL:`http://localhost:5000`
})

const useAxiosSecoure = () => {
    return axiosSecoure;
};

export default useAxiosSecoure;