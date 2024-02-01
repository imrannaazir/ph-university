import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routeGenerator from "../libs/routeGenerator";
import { adminPaths } from "./admin.routes";

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
]);

export default router;
