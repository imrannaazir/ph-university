/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  designationOptions,
  genderOptions,
} from "../../../constant/userManagement.constant";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TResponse, TSelectOptions } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartment/academicDepartment.api";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement/academicFaculty/academicFaculty.api";
import { createFacultyValidationSchema } from "../../../schemas/userManagement.validation";

const CreateFaculty = () => {
  // rtk query apis
  const { data: academicDepartmentData, isFetching: isDepartmentFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  const [CreateFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async ({ image, ...data }) => {
    const toastId = toast.loading("Creating", {
      duration: 2000,
    });

    const formData = new FormData();
    formData.append("data", JSON.stringify({ student: data }));
    formData.append("file", image);

    try {
      const response = (await CreateFaculty(formData)) as TResponse<TStudent>;

      if (response.error) {
        toast.error(response.error.data.errorSources[0].message, {
          id: toastId,
        });
      }

      if (response.data) {
        toast.success("Created", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create student.", { id: toastId });
    }
  };

  // options for select input
  const departmentOptions = academicDepartmentData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  })) as TSelectOptions;

  return (
    <Row justify={"center"}>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createFacultyValidationSchema)}
        >
          <Divider>Personal Information</Divider>
          <Row>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.firstName" type="text" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.middleName" type="text" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="name.lastName" type="text" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="email" type="text" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date of Birth" name="dateOfBirth" />
            </Col>
          </Row>
          {/* contact information */}
          <Divider>Contact Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="contactNo" type="text" label="Contact Number" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="presentAddress"
                type="text"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="permanentAddress"
                type="text"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Academic Information</Divider>

          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions}
                disabled={isDepartmentFetching}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="designation"
                label="Designation"
                options={designationOptions}
              />
            </Col>
          </Row>
          <Flex justify="end">
            <Button htmlType="submit" type="primary">
              Create Faculty
            </Button>
          </Flex>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
