import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const LoginRoute = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard/apply" replace />;
    }

    return children;
};

export default LoginRoute;
