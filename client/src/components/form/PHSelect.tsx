import { Form, Select } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { TSelectOptions } from "../../types";

type TPHSelectProps = {
  name: string;
  label: string;
  options: TSelectOptions;
  disabled?: boolean;
};

const PHSelect: FC<TPHSelectProps> = ({ label, name, options, disabled }) => (
  <Controller
    name={name}
    disabled={disabled}
    render={({ field, fieldState: { error } }) => (
      <Form.Item label={label}>
        <Select style={{ width: "100%" }} options={options} {...field} />
        {error && <small style={{ color: "red" }}>{error.message}</small>}
      </Form.Item>
    )}
  />
);

export default PHSelect;
