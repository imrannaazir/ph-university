/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { createStudentValidationSchema } from "../../../schemas/userManagement.validation";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constant/userManagement.constant";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement/user/userApi";
import { TResponse, TSelectOptions } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement/academicSemester/academicSemesterApi";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartment/academicDepartment.api";

const CreateStudent = () => {
  // rtk query apis
  const { data: academicSemesterData, isFetching: isSemesterFetching } =
    useGetAllSemestersQuery(undefined);
  const { data: academicDepartmentData, isFetching: isDepartmentFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  const [createStudent] = useCreateStudentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async ({ image, ...data }) => {
    const toastId = toast.loading("Creating", {
      duration: 2000,
    });

    const formData = new FormData();
    formData.append("data", JSON.stringify({ student: data }));
    formData.append("file", image);

    try {
      const response = (await createStudent(formData)) as TResponse<TStudent>;

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

  const semesterOptions = academicSemesterData?.data?.map((item) => ({
    label: `${item.name} - ${item.year}`,
    value: item._id,
  })) as TSelectOptions;

  return (
    <Row justify={"center"}>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createStudentValidationSchema)}
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
                name="emergencyContact"
                type="text"
                label="Emergency Contact Number"
              />
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
          <Divider>Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherName"
                type="text"
                label="Father's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherContactNo"
                type="text"
                label="Father's Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherOccupation"
                type="text"
                label="Father's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherName"
                type="text"
                label="Mother's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherContactNo"
                type="text"
                label="Mother's Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherOccupation"
                type="text"
                label="Mother's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.name"
                type="text"
                label="Local Guardian's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.contactNo"
                type="text"
                label="Local Guardian's Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.occupation"
                type="text"
                label="Local Guardian's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.address"
                type="text"
                label="Local Guardian's Address"
              />
            </Col>
          </Row>
          <Divider>Other Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                label="Admission Semester"
                options={semesterOptions}
                disabled={isSemesterFetching}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions}
                disabled={isDepartmentFetching}
              />
            </Col>
          </Row>
          <Flex justify="end">
            <Button htmlType="submit" type="primary">
              Create Student
            </Button>
          </Flex>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
