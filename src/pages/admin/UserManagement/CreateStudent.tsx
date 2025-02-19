import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import HookFormInput from "../../../components/form/HookFormInput";
import { Button, Divider, Form, Input } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import HookFormDatePicker from "../../../components/form/HookFormDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
  name: {
    firstName: "test",
    middleName: "A.",
    lastName: "Doe",
  },
  gender: "male",
  email: "test@xample.com",
  contactNo: "1234567890",
  emergancyNo: "1234567890",
  bloodGroup: "O+",
  address: "123 Maple Street, Springfield, USA",
  gurdian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+123456789012345",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+123456789012345",
  },
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log(data);
  console.log(error);

  const { data: sData, isLoading: sIsloading } =
    useGetAllSemesterQuery(undefined);

  const { data: dData, isLoading: dIsloading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('In data',data.profileImg);
    const studentData = {
      password: "Student123",
      student: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData));

    formData.append('file', data.profileImg)

    addStudent(formData);

    console.log(Object.fromEntries(formData));
  };
  return (
    <div>
      <HookForm onSubmit={onsubmit} defaultValues={studentDummyData}>
        <Divider>Personal Info</Divider>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <HookFormInput type="text" name="name.firstName" label="First Name" />
          <HookFormInput
            type="text"
            name="name.middleName"
            label="Middle Name"
          />
          <HookFormInput type="text" name="name.lastName" label="Last Name" />

          <HookFormSelector
            name="gender"
            label="Gender"
            options={genderOptions}
          />
          <HookFormDatePicker name="dateOfBirth" label="Date Of Birth" />

          <HookFormSelector
            name="bloodGroup"
            label="Blood Group"
            options={bloodGroupOptions}
          />

          <Controller
            name="profileImg"
            render={({field: {onChange, value, ...field}}) => (
              <Form.Item label={"Profile Image"}>
                <Input type="file" {...field} value={value?.fileName} onChange={(e)=> onChange(e.target.files?.[0])}/>
              </Form.Item>
            )}
          />
        </div>
        <Divider>Contact Info</Divider>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <HookFormInput type="email" name="email" label="Email" />
          <HookFormInput type="text" name="contactNo" label="Contact No" />
          <HookFormInput type="text" name="emergancyNo" label="Emergancy No" />
        </div>

        <Divider>Guardian Info</Divider>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <HookFormInput
            type="text"
            name="gurdian.fatherOccupation"
            label="Father Occupation"
          />
          <HookFormInput
            type="text"
            name="gurdian.fatherContactNo"
            label="Father Contact No"
          />
          <HookFormInput
            type="text"
            name="gurdian.motherName"
            label="Mother Name"
          />
          <HookFormInput
            type="text"
            name="gurdian.motherOccupation"
            label="Mother Occupation"
          />
          <HookFormInput
            type="text"
            name="gurdian.motherContactNo"
            label="Mother Contact No"
          />
        </div>

        <Divider>Academic Info</Divider>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <HookFormSelector
            name="admissionSemester"
            label="Admission Semester"
            options={semesterOptions}
            disabled={sIsloading}
          />

          <HookFormSelector
            name="academicDepartment"
            label="Admission Department"
            options={departmentOptions}
            disabled={dIsloading}
          />
        </div>

        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateStudent;
