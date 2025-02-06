import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";
import { facultyPath } from "./faculty.routes";
import { studentPath } from "./student.routes";
import Login from "../pages/Login";
import ProtectedRoute from "./../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPath),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentPath),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
