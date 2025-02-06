import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const HookFormInput = ({ type, name, label }: TInputProps) => {
  return (
    <>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </>
  );
};

export default HookFormInput;
