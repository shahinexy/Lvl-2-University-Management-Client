import { FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import { Button } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { toast } from "sonner";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import HookFormDatePicker from "../../../components/form/HookFormDatePicker";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import HookFormInput from "../../../components/form/HookFormInput";
import { TSemester } from "../../../types/courseManagement.type";
import { TResponse } from "../../../types/global";
import { semesterStatusOptions } from "../../../constants/semester";

const CreateCourse = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data } = useGetAllSemesterQuery([{ name: "sort", value: "year" }]);

  const academicSemesterOptions = data?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const semesterRegisterData = {
      ...data,
      maxCredit: Number(data.maxCredit),
      mainCredit: Number(data.mainCredit),
    };

    try {
      const res = (await addSemesterRegistration(
        semesterRegisterData
      )) as TResponse<TSemester>;
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
      <HookForm onSubmit={onSubmit}>
        <HookFormSelector
          label={"Academic Semester"}
          name={"academicSemester"}
          options={academicSemesterOptions}
        />

        <HookFormSelector
          name="status"
          label="Status"
          options={semesterStatusOptions}
        />

        <HookFormInput type="number" name="maxCredit" label="Max Credit" />
        <HookFormInput type="number" name="mainCredit" label="Main Credit" />

        <HookFormDatePicker name="startDate" label="Start Date" />
        <HookFormDatePicker name="endDate" label="End Date" />

        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateCourse;
