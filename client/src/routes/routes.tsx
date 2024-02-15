import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routeGenerator from "../libs/routeGenerator";
import { adminPaths } from "./admin.routes";
import LoginPage from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
