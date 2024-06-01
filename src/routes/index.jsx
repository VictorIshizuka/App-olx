import { Route, Routes } from "react-router-dom";
import { Home } from "../modules";
export const IsRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};
