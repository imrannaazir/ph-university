import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, logIn } from "../redux/features/auth/authSlice";
import decodeToken from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { Button, Row } from "antd";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in.");
    const userData = {
      id: data.id,
      password: data.password,
    };
    try {
      const response = await login(userData).unwrap();
      if (response?.data) {
        const user = decodeToken(response?.data.accessToken) as TUser;
        dispatch(
          logIn({
            token: response?.data.accessToken,
            user,
          })
        );
        toast.success("Logged in successfully.", {
          id: toastId,
          duration: 2000,
        });
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm
        onSubmit={onSubmit}
        defaultValues={{ id: "A-0001", password: "pH-university?1" }}
      >
        <PHInput type="text" name="id" label="Enter id" />
        <PHInput type="text" name="password" label="Enter id" />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </Row>
  );
};

export default LoginPage;
