import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import { Axios } from "../../../../Api/Axios";
import Error403 from "../Errors/403";
import LoadingScreen from "../../../../Components/Loading/LoadingScreen";

export default function RequiredAuth({ allowedRole }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get Token
  const cookie = Cookie();
  const token = cookie.get("Ecookie");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    Axios.get(`/${USER}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        cookie.remove("Ecookie");  // Clear invalid token
        navigate("/login", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRole.includes(user.role)) {
    return <Outlet />;
  }

  return <Error403 role={user?.role} />;
}
