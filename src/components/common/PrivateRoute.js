import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

function PrivateRoute({
    children
}) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/users/login" replace />
    }

    return children ? children : <Outlet />
};

export default PrivateRoute;