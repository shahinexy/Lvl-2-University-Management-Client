import { FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import { Button } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";

const currentYerar = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map((num) => ({
  value: String(currentYerar + num),
  label: String(currentYerar + num),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const submitResult = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(submitResult);
  };
  return (
    <div>
      <HookForm onSubmit={onSubmit}>
        <HookFormSelector
          label={"Name"}
          name={"name"}
          options={semesterOptions}
        />
        <HookFormSelector label={"Year"} name={"year"} options={yearOptions} />
        <HookFormSelector
          label={"Staet Month"}
          name={"startMonth"}
          options={monthOptions}
        />
        <HookFormSelector
          label={"End Month"}
          name={"endMonth"}
          options={monthOptions}
        />
        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateAcademicSemester;
