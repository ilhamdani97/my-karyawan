import { Navigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
// import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const cookies = new Cookies();
  const cookie = cookies.get('token');
  const isLogin = cookie && cookie.length > 0;
  
    if (!isLogin) {
        return <Navigate to="/signin" />;
    }
  return children;
};