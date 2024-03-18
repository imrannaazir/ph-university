import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentValidationSchema } from "../../../schemas/academicManagement.validation";
import { TResponse, TSelectOptions } from "../../../types/global.type";
import { toast } from "sonner";
import { TAcademicDepartment } from "../../../types/academicManagement";
import { useCreateAcademicDepartmentMutation } from "../../../redux/features/admin/academicManagement/academicDepartment/academicDepartment.api";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFaculty/academicFaculty.api";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicDepartment = () => {
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  })) as TSelectOptions;

  // on submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic department.", {
      duration: 2000,
    });

    try {
      const response = (await createAcademicDepartment(
        data
      )) as TResponse<TAcademicDepartment>;
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
          resolver={zodResolver(academicDepartmentValidationSchema)}
        >
          <PHInput name="name" label="Name" type="text" />

          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            disabled={isFetching}
            options={academicFacultyOptions}
          />

          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
