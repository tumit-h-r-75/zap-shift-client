import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {


    const { user, loading } = useAuth();
    

    const location = useLocation();
    


    if (loading) {
        return <div>
            <Loader></Loader>
        </div>
    }

    if (user && user?.email) {

        return children;
    }
    return <Navigate to="/auth/login" state={{ from: location }} replace />;


};

export default PrivateRoute;