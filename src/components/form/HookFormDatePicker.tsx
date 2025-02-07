import { DatePicker } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
    name: string;
    label?: string;
  };

const HookFormDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null} 
      <Controller
        name={name}
        render={({ field }) => <DatePicker  {...field}  style={{width: '100%'}}/>}
      />
    </div>
  );
};

export default HookFormDatePicker;
