import { Button } from "antd";
import HookForm from "../../../components/form/HookForm";
import HookFormInput from "../../../components/form/HookFormInput";
import { FieldValues } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Created Success", { id: toastId });
      }
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <div>
      <HookForm onSubmit={onSubmit}>
        <HookFormInput type="text" name="name" label="Name" />
        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateAcademicFaculty;
