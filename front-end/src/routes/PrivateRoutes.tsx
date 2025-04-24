import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  let isAuthenticated = false;

  if (token) {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      isAuthenticated = exp * 1000 > Date.now();
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
