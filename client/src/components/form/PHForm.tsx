import { FC, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: Record<string, any>;
};
const PHForm: FC<TPHFormProps> = ({ onSubmit, children, defaultValues }) => {
  const formConfig: { defaultValues?: Record<string, any> } = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>;
    </FormProvider>
  );
};

export default PHForm;
