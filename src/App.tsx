// External Library
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import AppRoutes from "./routes";

// Components
import { Header } from "./components/structure/Header";
import { Footer } from "./components/structure/Footer";

export default function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
}
