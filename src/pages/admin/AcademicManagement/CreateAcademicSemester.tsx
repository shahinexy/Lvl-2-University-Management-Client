import { FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import { Button } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types/academicSemester.type";

const currentYerar = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map((num) => ({
  value: String(currentYerar + num),
  label: String(currentYerar + num),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse<TAcademicSemester>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Created Success", { id: toastId });
      }
    } catch (err) {
      toast.error("Somthing went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <HookForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicSemesterSchema)}
      >
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
