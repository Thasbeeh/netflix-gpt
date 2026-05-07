import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAccessToken,
  clearAccessToken,
  addUser,
  removeUser,
} from "../utils/authSlice";
import api from "../utils/api";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (userData, token) => {
    dispatch(addUser(userData));
    dispatch(setAccessToken(token));
    navigate("/browse");
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      navigate("/error");
    } finally {
      dispatch(removeUser());
      dispatch(clearAccessToken());
      navigate("/");
    }
  };

  return { login, logout };
};
