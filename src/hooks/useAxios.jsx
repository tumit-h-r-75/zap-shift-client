import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:`https://zap-shift-server-three.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;