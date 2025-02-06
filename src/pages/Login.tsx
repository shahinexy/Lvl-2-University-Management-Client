import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { varifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HookForm from "../components/form/HookForm";
import HookFormInput from "../components/form/HookFormInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login...");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = varifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success("Login success", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Somthing went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <HookForm onSubmit={onSubmit}>
        <HookFormInput type={"text"} name={"userId"} label={"ID: "} />
        <br /> <br />
        <HookFormInput type="text" name="password" label={"Password: "} />
        <Button htmlType="submit">Submit</Button>
      </HookForm>
    </div>
  );
};

export default Login;
