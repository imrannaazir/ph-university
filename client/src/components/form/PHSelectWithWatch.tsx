import { Form, Select } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TSelectOptions } from "../../types";

type TPHSelectWithWatchProps = {
  name: string;
  label: string;
  options: TSelectOptions;
  disabled?: boolean;
  onValueChange: Dispatch<SetStateAction<string>>;
};

const PHSelectWithWatch: FC<TPHSelectWithWatchProps> = ({
  label,
  name,
  options,
  disabled,
  onValueChange,
}) => {
  const methods = useFormContext();
  const inputValue = methods.watch(name);

  useEffect(() => {
    if (inputValue) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
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
};

export default PHSelectWithWatch;
