// External Library
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import AppRoutes from "./routes";

// Components
import { Header } from "./components/structure/Header";
import { Footer } from "./components/structure/Footer";
import { AppNavigation } from "./components/structure/AppNavigation";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto p-4 md:p-8">
          <AppNavigation />
          <AppRoutes />
        </div>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </Router>
  );
}
