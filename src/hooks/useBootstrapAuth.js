import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import {
  addUser,
  clearAccessToken,
  removeUser,
  setAccessToken,
  setAuthChecked,
} from "../utils/authSlice";

const useBootstrapAuth = () => {
  const dispatch = useDispatch();

  const hasBootstrapped = useRef(false);

  const bootstrap = async () => {
    try {
      const res = await api.post("/auth/refresh", {});

      dispatch(setAccessToken(res.data.accessToken));
      dispatch(addUser(res.data.user));
    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;

      dispatch(removeUser());
      dispatch(clearAccessToken());
    } finally {
      dispatch(setAuthChecked(true));
    }
  };

  useEffect(() => {
    if (hasBootstrapped.current) return;

    hasBootstrapped.current = true;
    bootstrap();
  }, []);
};

export default useBootstrapAuth;
