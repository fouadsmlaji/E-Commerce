import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Loading from "./Login";
import { Axios } from "../../../Api/Axios";
import Error403 from "./403";

export default function RequiredAuth({ allowedRole }) {
  //Get user
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  //Get Token
  const cookie = Cookie();
  const token = cookie.get("Ecookie");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
