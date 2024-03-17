import { TableColumnsType } from "antd";
import { TAcademicSemester } from "../types/academicManagement";
import {
  AcademicSemesterNames,
  currentYear,
} from "../constant/academicManagement.constant";

const nameFilterOptions = AcademicSemesterNames.map((item) => ({
  text: item,
  value: item,
}));

const yearFilterOptions = [0, 1, 2, 3, 4].map((item) => ({
  text: String(currentYear + item),
  value: String(currentYear + item),
}));

const academicSemesterColumns: TableColumnsType<
  Pick<TAcademicSemester, "name" | "startMonth" | "endMonth" | "year">
> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: nameFilterOptions,
  },
  {
    title: "Year",
    dataIndex: "year",
    filters: yearFilterOptions,
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];

export default academicSemesterColumns;
