import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { IsRoutes } from "./routes";
import { Header } from "./common/components/Header";
import { Footer } from "./common/components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <IsRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
