import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";


const AcademicSemester = () => {
    const {data} = useGetAllSemesterQuery(undefined)
    console.log(data);
    return (
        <div>
            Academic Semester Page
        </div>
    );
};

export default AcademicSemester;