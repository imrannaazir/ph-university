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
import { TSelectOptions } from "../../../types/global.type";

const CreateAcademicSemester = () => {
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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, ...restData } = data;
    const formData = {
      ...restData,
      code: name,
      name: AcademicSemesterNames[Number(name - 1)],
    };
    console.log(formData);
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
