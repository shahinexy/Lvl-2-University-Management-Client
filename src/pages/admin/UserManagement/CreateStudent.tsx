import { FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import HookFormInput from "../../../components/form/HookFormInput";
import { Button, Divider } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";

const dummyData = {
  password: "Example123",
  student: {
    name: {
      firstName: "test",
      middleName: "A.",
      lastName: "Doe",
    },
    gender: "male",
    dateOfBirth: "2005-07-15",
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
    admissionSemester: "6797596d4973e16e6b7d8bb9",
    academicDepartment: "679759017ad0a59b860b24d0",
    isDeleted: false,
  },
};

const studentDummyData = {
  name: {
    firstName: "test",
    middleName: "A.",
    lastName: "Doe",
  },
  gender: "male",
  dateOfBirth: "2005-07-15",
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
  admissionSemester: "6797596d4973e16e6b7d8bb9",
  academicDepartment: "679759017ad0a59b860b24d0",
  isDeleted: false,
};

const CreateStudent = () => {
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
          <HookFormInput type="text" name="dateOfBirth" label="Date Of Birth" />

          <HookFormSelector
            name="bloodGroup"
            label="Blood Group"
            options={bloodGroupOptions}
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
          <HookFormInput type="text" name="gurdian.motherName" label="Mother Name" />
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

        {/* <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <HookFormInput
            type="text"
            name="admissionSemester"
            label="Admission Semester"
          />
          <HookFormInput
            type="text"
            name="academicDepartment"
            label="Academic Department"
          />
        </div> */}

        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateStudent;
