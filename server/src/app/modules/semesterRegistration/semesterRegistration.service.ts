import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { SemesterStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

// create semester registration
const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  /* 
1.  Check if any 'INCOMING' or 'ONGOING' semester registration is already exist
2. Check if academic semester exist by the ID
3. Check any semester registration is already created by provided id
4. create the semester registration
*/

  const isIncomingOngoingSemesterRegistered =
    await SemesterRegistration.findOne({
      $or: [
        {
          status: SemesterStatus.INCOMING,
        },
        {
          status: SemesterStatus.ONGOING,
        },
      ],
    });

  if (isIncomingOngoingSemesterRegistered)
    throw new AppError(
      StatusCodes.CONFLICT,
      `There was already an ${isIncomingOngoingSemesterRegistered.status} semesterRegister`
    );

  //check academic semester existence
  const isAcademicSemesterExist = await AcademicSemester.findById(
    payload.academicSemester
  );
  if (!isAcademicSemesterExist)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic semester not found by id ${payload.academicSemester}`
    );

  // check if already registered by provided semester
  const isAcademicSemesterRegisteredBySemesterId =
    await SemesterRegistration.findOne({
      academicSemester: payload.academicSemester,
    });

  if (isAcademicSemesterRegisteredBySemesterId?._id)
    throw new AppError(
      StatusCodes.CONFLICT,
      `There is already semester registration by ${isAcademicSemesterRegisteredBySemesterId.academicSemester} academic semester.`
    );

  const result = await SemesterRegistration.create(payload);
  return result;
};

// get all semester registration
const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query
  )
    .filters()
    .sort()
    .fields()
    .paginate();

  const result = await semesterRegistrationQuery.modelQuery;

  if (result.length === 0)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'No semester registration founded.'
    );

  return result;
};

// get single semester registration
const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};
export default SemesterRegistrationService;
