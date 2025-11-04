// External library
import { type RouteObject, useRoutes } from "react-router-dom";

// Pages
import CatalogPage from "./modules/movies/pages/CatalogPage";
import ShowCasePage from "./modules/movies/pages/ShowCasePage";
import CreateMoviePage from "./modules/movies/pages/CreateMovie";

const routesList: RouteObject[] = [
  {
    path: "/",
    element: <CatalogPage />,
  },
  {
    path: "/create",
    element: <CreateMoviePage />,
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
    element: <ShowCasePage />,
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
