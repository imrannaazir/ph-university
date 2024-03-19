import { DatePicker, Form } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
  name: string;
  label: string;
};

const PHDatePicker: FC<TPHDatePickerProps> = ({ label, name }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item label={label}>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(value) => {
                if (value) {
                  field.onChange(value?.toString());
                }
              }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        );
      }}
    />
  );
};

export default PHDatePicker;
