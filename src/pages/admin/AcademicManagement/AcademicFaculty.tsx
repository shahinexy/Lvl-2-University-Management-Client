import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
        const {data} = useGetAllAcademicFacultyQuery(undefined)
    
        console.log(data?.data);
    return (
        <div>
            Academic Faculty
        </div>
    );
};

export default AcademicFaculty;