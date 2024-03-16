import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemesterPage = () => {
  const { data } = useGetAllSemestersQuery(undefined);

  return <div>This is academic semester page. :{data?.message}</div>;
};

export default AcademicSemesterPage;
