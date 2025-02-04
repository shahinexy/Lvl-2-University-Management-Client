import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourses from "../pages/faculty/OfferedCourses";

export const facultyPath = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <FacultyDashboard />,
      },
      {
        name: "User Management",
        children: [
          {
            name: "Create Admin",
            path: "create-admin",
            element: <OfferedCourses />,
          },
        ],
      },
]