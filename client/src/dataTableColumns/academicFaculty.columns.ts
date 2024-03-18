import { TableColumnsType } from "antd";
import { TAcademicFaculty } from "../types";

const academicFacultyColumns: TableColumnsType<Pick<TAcademicFaculty, "name">> =
  [
    {
      title: "SL",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

export default academicFacultyColumns;
