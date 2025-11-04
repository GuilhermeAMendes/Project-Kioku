// External library
import { type RouteObject, useRoutes } from "react-router-dom";

const routesList: RouteObject[] = [
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/create",
    element: <div>Create</div>,
  },
  {
    path: "/update",
    element: <div>Update</div>,
  },
  {
    path: "/delete",
    element: <div>Delete</div>,
  },
  {
    path: "/read",
    element: <div>Read</div>,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

export default function AppRoutes() {
  const elementRoutes = useRoutes(routesList);
  return elementRoutes;
}
