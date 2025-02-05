import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { varifyToken } from "../utils/verifyToken";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    console.log(userInfo);
    const res = await login(userInfo).unwrap();
    const user = varifyToken(res.data.accessToken);
    dispatch(setUser({ user, token: res.data.accessToken }));
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
