import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label: string;
  options: {value: string; label: string; disabled?: boolean}[]
}


const HookFormSelector = ({ name, label, options }: TSelectProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: {error} }) => (
          <Form.Item label={label}>
            <Select
              style={{ width: "100%" }}
              {...field}
              options={options}
            />
            {error && <small style={{color: 'red'}}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default HookFormSelector;
