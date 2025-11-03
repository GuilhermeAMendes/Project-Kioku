// External Library
import { useNavigate, type NavigateOptions, type To } from "react-router-dom";

export const useNavigationHandler = () => {
  const navigate = useNavigate();

  const navigateTo = (to: To, options?: NavigateOptions) => {
    navigate(to, options);
  };

  return { navigateTo };
};
