import { Button } from "antd";
import HookForm from "../../../components/form/HookForm";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { FieldValues } from "react-hook-form";
import {
  useGetAllCoureseQuery,
  useGetAllRegesteredSemesterQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import SelectorWithWatch from "../../../components/form/SelectorWithWatch";
import { useState } from "react";

const OfferedCourse = () => {
  const [courseId, setCourseId] = useState("");
  console.log(courseId);

  const { data: semester } = useGetAllRegesteredSemesterQuery(undefined);

  const semesterOptions = semester?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));

  const { data: academicFaculty } = useGetAllAcademicFacultyQuery(undefined);

  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: course } = useGetAllCoureseQuery(undefined);

  const courseOptions = course?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const { data: facultyData } = useGetAllFacultiesQuery(undefined);

  const facultyOptions = facultyData?.data.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <HookForm onSubmit={onSubmit}>
        <HookFormSelector
          label={"Semester Registration"}
          name={"semesterRegistration"}
          options={semesterOptions}
        />
        <HookFormSelector
          label={"Academic Faculty"}
          name={"academicFaculty"}
          options={academicFacultyOptions}
        />
        <HookFormSelector
          label={"Academic Department"}
          name={"academicDepartment"}
          options={academicDepartmentOptions}
        />
        <SelectorWithWatch
          onValueChange={setCourseId}
          label={"Courses"}
          name={"course"}
          options={courseOptions}
        />
        <HookFormSelector
          disabled={!courseId}
          label={"Faculties"}
          name={"faculty"}
          options={facultyOptions}
        />

        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default OfferedCourse;
