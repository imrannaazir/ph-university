import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  const newAcademicSemester = await AcademicSemester.create(payload);
  return newAcademicSemester;
};

const AcademicSemesterService = {
  createAcademicSemester,
};

export default AcademicSemesterService;
