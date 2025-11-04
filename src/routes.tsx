// External library
import { type RouteObject, useRoutes } from "react-router-dom";

// Pages
import CatalogPage from "./modules/movies/pages/CatalogPage";
import ShowCasePage from "./modules/movies/pages/ShowCasePage";
import CreateMoviePage from "./modules/movies/pages/CreateMovie";
import EditMoviePage from "./modules/movies/pages/EditMoviePage";
import DeleteMoviePage from "./modules/movies/pages/DeleteMoviePage";
import NotFoundPage from "./modules/movies/pages/NotFoundPage";

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
    element: <EditMoviePage />,
  },
  {
    path: "/delete",
    element: <DeleteMoviePage />,
  },
  {
    path: "/read",
    element: <ShowCasePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default function AppRoutes() {
  const elementRoutes = useRoutes(routesList);
  return elementRoutes;
}
