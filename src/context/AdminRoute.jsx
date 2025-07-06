import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loader from '../components/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (user && role === 'admin') {
    return children;
  }

  // যদি admin না হয়, তাহলে অন্য কোথাও পাঠিয়ে দাও
  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;
