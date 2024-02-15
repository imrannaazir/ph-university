import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/authApi";
import { useAppDispatch } from "../redux/hooks";
import { logIn } from "../redux/features/authSlice";
import decodeToken from "../utils/decodeToken";

// type
type TInputs = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [login, { isLoading, error, data }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm<TInputs>();
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const userData = {
      id: data.id,
      password: data.password,
    };
    const response = await login(userData).unwrap();
    console.log(response?.data.token);

    if (response?.data) {
      dispatch(
        logIn({
          token: response?.data.accessToken,
          user: decodeToken(response?.data.accessToken),
        })
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        id
        <input type="text" id="id" {...register("id")} />
        password
        <input type="text" id="password" {...register("password")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
