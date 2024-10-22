import { Route, Routes } from "react-router-dom";
import { Home } from "../modules";
import { NotFound } from "../common/pages/NotFound";
import { Signin } from "../modules/auth/pages/Signin";
import { Signup } from "../modules/auth/pages/Signup";
import { Ad } from "../modules/ad/pages/Ad";
import { AddAd } from "../modules/ad/pages/AddAd";
import RouteHandler from "../common/components/RouteHandler";
import { Ads } from "../modules/ad/pages/Ads";
import { Profile } from "../modules/users/pages/profile";

export const IsRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ads" element={<Ads />} />
        <Route
          path="/post-an-ad"
          element={
            <RouteHandler private>
              <AddAd />
            </RouteHandler>
          }
        />
        <Route
          path="/perfil"
          element={
            <RouteHandler private>
              <Profile />
            </RouteHandler>
          }
        />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
