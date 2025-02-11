import { Button } from "antd";
import HookForm from "../../../components/form/HookForm";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { FieldValues } from "react-hook-form";
import {
  useGetAllCoureseQuery,
  useGetAllRegesteredSemesterQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import SelectorWithWatch from "../../../components/form/SelectorWithWatch";
import { useState } from "react";
import HookFormInput from "../../../components/form/HookFormInput";
import { weekDaysOptions } from "../../../constants/global";
import HookFormTimePicker from "../../../components/form/HookFormTimePicker";

const OfferedCourse = () => {
  const [courseId, setCourseId] = useState("");

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

  const { data: facultyData, isFetching: isFacultyFetching } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const facultyOptions = facultyData?.data?.faculties.map((item) => ({
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
          disabled={!courseId || isFacultyFetching}
          label={"Faculties"}
          name={"faculty"}
          options={facultyOptions}
        />

        <HookFormInput type="text" name="section" label="Section" />
        <HookFormInput type="text" name="maxCapacity" label="Max Capacity" />

        <HookFormSelector label="Days" name="days" options={weekDaysOptions} />

        <HookFormTimePicker
          label="Start Time"
          name="startTime"
          format="HH:mm"
        />
        <HookFormTimePicker label="End Time" name="endTime" format="HH:mm" />

        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default OfferedCourse;
