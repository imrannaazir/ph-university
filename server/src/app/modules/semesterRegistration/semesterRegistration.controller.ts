import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import SemesterRegistrationService from './semesterRegistration.service';

// create semester registration
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

// get all semester registration
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await SemesterRegistrationService.getAllSemesterRegistration(
    query
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All semester registrations retrieved successfully.',
    data: result,
  });
});

// get single semester registration
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistration(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Semester registration retrieved successfully.',
    data: result,
  });
});

// update semester registration
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await SemesterRegistrationService.updateSemesterRegistration(
    id,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Semester registration updated successfully.`,
    data: result,
  });
});

// delete semester registration by Id
const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  await SemesterRegistrationService.deleteSemesterRegistration(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Semester registration deleted successfully.`,
    data: null,
  });
});
const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
export default SemesterRegistrationController;
