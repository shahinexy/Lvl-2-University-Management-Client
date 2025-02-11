import { TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  format: string;
};

const HookFormTimePicker = ({ name, label, format }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <TimePicker {...field} format={format} style={{ width: "100%" }} />
        )}
      />
    </div>
  );
};

export default HookFormTimePicker;
