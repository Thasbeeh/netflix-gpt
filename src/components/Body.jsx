import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../utils/api";
import { clearAccessToken, setAccessToken } from "../utils/authSlice";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  const bootStrapAuth = async () => {
    try {
      const res = await api.post("/auth/refresh");
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(addUser(res.data.user));
    } catch {
      dispatch(removeUser());
      dispatch(clearAccessToken());
    }
  };

  useEffect(() => {
    bootStrapAuth();
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
