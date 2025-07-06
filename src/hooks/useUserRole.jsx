import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecoure from './useAxiosSecoure';

const useUserRole = () => {
  const { user, loading } = useAuth(); 
  const axiosSecure = useAxiosSecoure(); 

  const { data: role, isPending: roleLoading } = useQuery({
    enabled: !!user?.email && !loading,
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user.email}`);
      return res.data?.role;
    }
  });

  return { role, roleLoading };
};

export default useUserRole;
