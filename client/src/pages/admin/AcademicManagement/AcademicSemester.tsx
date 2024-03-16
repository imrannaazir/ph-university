import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement/academicSemester/academicSemesterApi";

const AcademicSemesterPage = () => {
  const response = useGetAllSemestersQuery(undefined);
  console.log(response);

  return <div>This is academic semester page. :{response.data?.message}</div>;
};

export default AcademicSemesterPage;
