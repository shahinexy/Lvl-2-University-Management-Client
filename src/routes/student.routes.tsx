import EnrolledCourses from "../pages/student/EnrolledCourses";
import StudentDashboard from "../pages/student/StudentDashboard";


export const studentPath = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        name: "User Management",
        children: [
          {
            name: "Create Admin",
            path: "create-admin",
            element: <EnrolledCourses />,
          }
        ],
      },
]