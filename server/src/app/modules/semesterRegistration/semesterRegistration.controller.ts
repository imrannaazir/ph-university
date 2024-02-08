import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import SemesterRegistrationService from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.createSemesterRegistration(
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Semester registration created successfully.',
    data: result,
  });
});

const SemesterRegistrationController = {
  createSemesterRegistration,
};
export default SemesterRegistrationController;
