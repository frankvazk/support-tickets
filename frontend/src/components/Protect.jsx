import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Protect = ({ children }) => {
  const { isLoggedIn, isCheckingStatus } = useAuthStatus();
  if (isCheckingStatus) {
    return <h1>Loading...</h1>;
  }

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default Protect;
