import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterValidationSchema } from "../../../schemas/academicManagement.validation";
import {
  AcademicSemesterNames,
  months,
} from "../../../constant/academicManagement.constant";
import { TResponse, TSelectOptions } from "../../../types/global.type";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement/academicSemester/academicSemesterApi";
import { toast } from "sonner";
import { TAcademicSemester } from "../../../types/academicManagement";

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();

  const currentYear = new Date().getFullYear();
  const yearOptions: TSelectOptions = [0, 1, 2, 3, 4].map((item) => {
    const year = (currentYear + item).toString();
    return {
      label: year,
      value: year,
    };
  });

  const nameOptions: TSelectOptions = AcademicSemesterNames.map((item, i) => ({
    label: item,
    value: `0${i + 1}`,
  }));

  const monthOptions: TSelectOptions = months.map((item) => ({
    label: item,
    value: item,
  }));

  // on submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester.", {
      duration: 2000,
    });
    const { name, ...restData } = data;
    const formData = {
      ...restData,
      semesterCode: name,
      name: AcademicSemesterNames[Number(name - 1)],
    };

    try {
      const response = (await createAcademicSemester(
        formData
      )) as TResponse<TAcademicSemester>;
      if (response.error) {
        toast.error(response.error.data.errorSources[0].message, {
          id: toastId,
        });
      }
      if (response?.data?.success) {
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
          resolver={zodResolver(academicSemesterValidationSchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect
            label="Start month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End month" name="endMonth" options={monthOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />

          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
