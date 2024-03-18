import { TableColumnsType } from "antd";
import { TDepartmentTableData } from "../types";

export type TFilterOption = {
  text: string;
  value: string;
};

const academicDepartmentColumns = (
  filters: TFilterOption[]
): TableColumnsType<TDepartmentTableData> => {
  return [
    {
      title: "SL",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      filters: filters,
    },
  ];
};
export default academicDepartmentColumns;
