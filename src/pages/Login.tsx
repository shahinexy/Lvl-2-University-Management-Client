import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const [login, { data, error }] = useLoginMutation();

  console.log("data =>", data);
  console.log("error =>", error);

  const onSubmit = (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    console.log(userInfo);
    login(userInfo);
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
