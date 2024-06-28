import { Route, Routes } from "react-router-dom";
import { Home } from "../modules";
import { NotFound } from "../common/pages/NotFound";
import { Signin } from "../modules/auth/pages/Signin";
import { Signup } from "../modules/auth/pages/Signup";

export const IsRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
