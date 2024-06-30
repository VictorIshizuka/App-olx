import { Navigate } from "react-router-dom";
import { isLogged } from "../../helpers/AuthHandler";

// eslint-disable-next-line react/prop-types
export default function RouteHandler({ children, ...rest }) {
  let logged = isLogged();
  let authorized = rest.private && !logged ? false : true;

  return authorized ? children : <Navigate to="/signin" />;
}
