import { FC, useState } from "react";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import academicSemesterColumns from "../../../dataTableColumns/academicSemester.columns";
import {
  TAcademicSemesterTableData,
  TQueryParam,
} from "../../../types/academicManagement";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement/academicSemester/academicSemesterApi";

const AcademicSemesterPage: FC = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: semesterData, isFetching } = useGetAllSemestersQuery([
    { name: "page", value: page },
    ...params,
  ]);

  const onChange: TableProps<TAcademicSemesterTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      // when name filtering
      if (filters.name) {
        filters.name.forEach((item) => {
          queryParams.push({
            name: "name",
            value: item,
          });
        });
      }

      // when year filtering
      if (filters.year) {
        filters.year.forEach((item) => {
          queryParams.push({
            name: "year",
            value: item,
          });
        });
      }

      setParams(queryParams);
    }
  };

  const data = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  return (
    <>
      <Table
        pagination={false}
        loading={isFetching}
        columns={academicSemesterColumns}
        dataSource={data}
        onChange={onChange}
      />

      <Pagination
        style={{ marginTop: "6px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={semesterData?.meta?.limit}
        total={semesterData?.meta?.total}
      />
    </>
  );
};

export default AcademicSemesterPage;
