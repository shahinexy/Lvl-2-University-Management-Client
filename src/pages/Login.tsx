import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { varifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
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
      console.log(userInfo);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userId")} type="text" placeholder="User Id" />{" "}
        <br /> <br />
        <input {...register("password")} type="text" placeholder="Password" />
        <Button htmlType="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
