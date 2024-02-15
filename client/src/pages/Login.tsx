import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { logIn } from "../redux/features/auth/authSlice";
import decodeToken from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// type
type TInputs = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toastId = toast.loading("Logging in.");

  if (error) {
    toast.error("Something went wrong.", { id: toastId });
  }
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
      toast.success("Logged in successfully.", { id: toastId, duration: 2000 });
      navigate(`/`);
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
