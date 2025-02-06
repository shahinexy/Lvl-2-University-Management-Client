import { FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import HookFormInput from "../../../components/form/HookFormInput";
import { Button } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <HookForm onSubmit={onSubmit}>
        <HookFormInput type="text" name="name" label="Name" />
        <HookFormSelector label={'Selet'}/>
        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateAcademicSemester;
