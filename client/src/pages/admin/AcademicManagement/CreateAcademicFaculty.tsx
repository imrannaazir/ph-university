import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultyValidationSchema } from "../../../schemas/academicManagement.validation";

import { TResponse } from "../../../types/global.type";
import { toast } from "sonner";
import { TAcademicFaculty } from "../../../types/academicManagement";
import PHInput from "../../../components/form/PHInput";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement/academicFaculty/academicFaculty.api";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  // on submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic faculty.", {
      duration: 2000,
    });

    try {
      const response = (await createAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      if (response.error) {
        toast.error(response.error.data.errorSources[0].message, {
          id: toastId,
        });
      }
      if (response?.data) {
        toast.success("Created successfully.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        id: toastId,
      });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultyValidationSchema)}
        >
          <PHInput name="name" type="text" label="Faculty name" />

          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
