// External library
import { type RouteObject, useRoutes } from "react-router-dom";

const routesList: RouteObject[] = [
  {
    path: "/",
    element: <>Homepage</>,
  },
  {
    path: "/create",
    element: <>Homepage</>,
  },
  {
    path: "/update",
    element: <>Homepage</>,
  },
  {
    path: "/delete",
    element: <>Homepage</>,
  },
  {
    path: "*",
    element: <>Homepage</>,
  },
];

export default function AppRoutes() {
  const elementRoutes = useRoutes(routesList);
  return elementRoutes;
}
