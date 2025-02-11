import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { varifyToken } from "../../utils/verifyToken";

type ProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user;

  if(token){
    user = varifyToken(token) as TUser
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
