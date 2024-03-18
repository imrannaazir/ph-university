import { FC, useState } from "react";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import {
  TDepartmentTableData,
  TQueryParam,
} from "../../../types/academicManagement";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartment/academicDepartment.api";
import academicDepartmentColumns, {
  TFilterOption,
} from "../../../dataTableColumns/academicDepartment.columns";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFaculty/academicFaculty.api";

const AcademicDepartmentPage: FC = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: departmentData, isFetching } = useGetAllAcademicDepartmentQuery(
    [{ name: "page", value: page }, ...params]
  );

  const { data: facultyData, isFetching: isFacultyFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const onChange: TableProps<TDepartmentTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      // when name filtering
      if (filters.academicFaculty) {
        filters.academicFaculty.forEach((item) => {
          queryParams.push({
            name: "academicFaculty",
            value: item,
          });
        });
      }

      setParams(queryParams);
    }
  };

  const data = departmentData?.data?.map(({ name, academicFaculty }, i) => ({
    key: `${i + 1}`,
    name,
    academicFaculty: academicFaculty.name,
  }));

  const academicFilterOptions = facultyData?.data?.map((faculty) => ({
    text: faculty.name,
    value: `${faculty._id}`,
  })) as TFilterOption[];

  return (
    <>
      <Table
        pagination={false}
        loading={isFetching || isFacultyFetching}
        columns={academicDepartmentColumns(academicFilterOptions)}
        dataSource={data}
        onChange={onChange}
      />

      <Pagination
        style={{ marginTop: "6px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={departmentData?.meta?.limit}
        total={departmentData?.meta?.total}
      />
    </>
  );
};

export default AcademicDepartmentPage;
