import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import useBootstrapAuth from "../hooks/useBootstrapAuth";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import GptSearch from "./GptSearch";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

import { MOVIE_CATEGORIES } from "../utils/constants";
import CategorySection from "./CategorySection";

const Body = () => {
  useBootstrapAuth();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute>
          <Browse />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true, // This shows by default at /browse
          element: (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          ),
        },
        ...MOVIE_CATEGORIES.map((category) => ({
          path: category.apiEndPoint,
          element: (
            <CategorySection
              title={category.title}
              category={category.key}
              apiEndPoint={category.apiEndPoint}
            />
          ),
        })),
      ],
    },
    {
      path: "/gpt-search",
      element: <GptSearch />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
