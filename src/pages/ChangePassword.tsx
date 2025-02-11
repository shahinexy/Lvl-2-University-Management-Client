import { Button } from "antd";
import HookForm from "../components/form/HookForm";
import HookFormInput from "../components/form/HookFormInput";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

const ChangePassword = () => {
    const navigate = useNavigate()
    const [changePass] = useChangePasswordMutation()
    const dispatch = useAppDispatch()

  const onSubmit = async(data: FieldValues) => {
      const res = await changePass(data)
      console.log(res);
      if(res?.data?.success){
        toast.success(res.data.message)
        dispatch(logout())
        navigate(`/login`)
      }else{
        toast.error(res?.error?.data?.message)
      }
  };
  return (
    <div style={{ width: "700px"}}>
        <h1>Change your password</h1>
      <HookForm onSubmit={onSubmit}>
        <HookFormInput type="text" name="oldPassword" label="Old Password" />
        <br /> <br />
        <HookFormInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default ChangePassword;
