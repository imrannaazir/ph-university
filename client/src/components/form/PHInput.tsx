import { Input } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

type TPHInputProps = {
  type: React.HTMLInputTypeAttribute;
  name: string;
  label?: string;
};

const PHInput: FC<TPHInputProps> = ({ type, label, name }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <div style={{ marginBottom: "10px" }}>
          {label && <p style={{ marginBottom: "5px" }}>{label}</p>}
          <Input {...field} type={type} id={name} />
        </div>
      )}
    ></Controller>
  );
};

export default PHInput;
