import { FieldValues, SubmitHandler } from "react-hook-form";
import HookForm from "../../../components/form/HookForm";
import { Button } from "antd";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useGetAllCoureseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import HookFormInput from "../../../components/form/HookFormInput";
import { TCourse } from "../../../types/courseManagement.type";
import { TResponse } from "../../../types/global";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();

  const { data } = useGetAllCoureseQuery(undefined);

  const courseOptions = data?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    console.log(courseData);
    try {
      const res = (await createCourse(courseData)) as TResponse<TCourse>;
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
        <HookFormInput type="text" name="title" label="Title" />
        <HookFormInput type="text" name="prefix" label="Prefix" />
        <HookFormInput type="text" name="code" label="Code" />
        <HookFormInput type="text" name="credits" label="Credits" />

        <HookFormSelector
          mode="multiple"
          label={"Pre-Requisite Courses"}
          name={"preRequisiteCourses"}
          options={courseOptions}
        />

        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default CreateCourse;
