import { Route, Routes } from "react-router-dom";
import { Home } from "../modules";
import { NotFound } from "../common/pages/NotFound";
import { Signin } from "../modules/auth/pages/Signin";
import { Signup } from "../modules/auth/pages/Signup";
import { Ad } from "../modules/ad/pages/Ad";

export const IsRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ad/:id" element={<Ad />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
