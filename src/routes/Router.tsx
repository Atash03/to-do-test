import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Loading } from "../components";
import Main from "../components/Main";
import { Home } from "../pages";

const Login = lazy(() => import("../components/Login"));
const Sign = lazy(() => import("../components/Sign"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const TaskListDetails = lazy(() => import("../pages/TastListDetails"));

const Router: React.FC = () => {
  let routes = useRoutes([
    {
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
      path: "/login",
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <TaskListDetails />
        </Suspense>
      ),
      path: "/tasks/:id",
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        </Suspense>
      ),
      path: "/protectedRoute",
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <Sign />
        </Suspense>
      ),
      path: "/sign",
    },
    {
      element: <Home />,
      path: "/",
    },
    {
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      path: "/dashboard",
    },
    {
      element: <Navigate to="/" />,
      path: "*",
    },
  ]);
  return routes;
};

export default Router;
