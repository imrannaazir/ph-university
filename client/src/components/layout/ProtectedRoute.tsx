import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/features/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectToken);
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
