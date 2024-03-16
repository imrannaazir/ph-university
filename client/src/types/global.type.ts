export type TSelectOptions = { label: string; value: string }[];

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: [{ path: string; message: string }];
  };
};

export type TResponse<T> = {
  error?: TError;
  data: {
    success: boolean;
    message: string;
    data: T;
  };
};
