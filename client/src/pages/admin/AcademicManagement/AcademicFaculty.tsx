import { FC, useState } from "react";
import { Pagination, Table } from "antd";

import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFaculty/academicFaculty.api";
import academicFacultyColumns from "../../../dataTableColumns/academicFaculty.columns";

const AcademicFacultyPage: FC = () => {
  const [page, setPage] = useState(1);

  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery([{ name: "page", value: page }]);

  const data = academicFacultyData?.data?.map(({ name }, i) => ({
    key: i + 1,
    name,
  }));

  return (
    <>
      <Table
        pagination={false}
        loading={isFetching}
        columns={academicFacultyColumns}
        dataSource={data}
      />

      <Pagination
        style={{ marginTop: "6px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={academicFacultyData?.meta?.limit}
        total={academicFacultyData?.meta?.total}
      />
    </>
  );
};

export default AcademicFacultyPage;
