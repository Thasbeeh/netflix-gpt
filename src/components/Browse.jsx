import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const Browse = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Browse;
