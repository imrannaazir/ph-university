import { Form } from "antd";
import { FC, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFormConfig = { defaultValues?: Record<string, unknown>; resolver?: any };

type TPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const PHForm: FC<TPHFormProps> = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}) => {
  // form configuration
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(handleSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
