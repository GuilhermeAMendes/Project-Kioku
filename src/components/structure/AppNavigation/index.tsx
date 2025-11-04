// External Library
import { cn } from "../../../lib/utils";
import { Link, useLocation } from "react-router-dom";

// Constants
const navLinks = [
  { href: "/", label: "Início" },
  { href: "/create", label: "Criar" },
  { href: "/update", label: "Alterar" },
  { href: "/delete", label: "Apagar" },
];

export function AppNavigation() {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-4 sm:gap-8 border-b pb-4 mb-6 md:mb-8">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href;
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary",
              isActive
                ? "text-primary font-semibold border-b-4 border-indigo-700"
                : "text-muted-foreground border-b-4 border-transparent"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
