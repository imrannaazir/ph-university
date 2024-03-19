import { Form, Input } from "antd";
import { FC, HTMLInputTypeAttribute } from "react";
import { Controller } from "react-hook-form";

type TPHInputProps = {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
};

const PHInput: FC<TPHInputProps> = ({ type, label, name }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: "10px" }}>
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
          </Form.Item>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </div>
      )}
    ></Controller>
  );
};

export default PHInput;
