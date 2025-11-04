// External Library
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl tracking-tight text-primary">
            Kioku
          </span>
        </Link>
      </div>
    </header>
  );
}
