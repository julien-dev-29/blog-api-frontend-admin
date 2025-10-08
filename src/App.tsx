import { Outlet } from "react-router";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
