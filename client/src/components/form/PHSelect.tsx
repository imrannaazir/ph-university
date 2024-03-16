import { Form, Select } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

const PHSelect: FC<TPHSelectProps> = ({ label, name, options }) => (
  <Controller
    name={name}
    render={({ field, fieldState: { error } }) => (
      <Form.Item label={label}>
        <Select style={{ width: "100%" }} options={options} {...field} />
        {error && <small style={{ color: "red" }}>{error.message}</small>}
      </Form.Item>
    )}
  />
);

export default PHSelect;
