// External Library
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import AppRoutes from "./routes";

// Components
import { Header } from "./components/structure/Header";
import { Footer } from "./components/structure/Footer";
import { AppNavigation } from "./components/structure/AppNavigation";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <AppNavigation />
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}
