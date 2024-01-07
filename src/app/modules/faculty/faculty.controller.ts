import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FacultyService from './faculty.service';

// get all faculties
const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFaculties(req.query);

  sendResponse(res, {
    success: true,
    message: 'Faculties retrieved successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

//get faculty by Id
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty retrieved successfully.',
    data: result,
  });
});

// update faculty by Id
const updateFacultyById = catchAsync(async (req, res) => {
  const query = req.query;
  const { id } = req.params;

  const result = await FacultyService.updateFacultyById(id, query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty updated successfully.',
    data: result,
  });
});

// delete faculty by Id
const deleteFacultyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFacultyById(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty deleted successfully.',
    data: result,
  });
});
const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFacultyById,
  deleteFacultyById,
};
export default FacultyController;
