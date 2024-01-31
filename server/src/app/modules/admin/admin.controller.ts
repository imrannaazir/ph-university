import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AdminService from './admin.service';

// get all admins
const getAllAdmins = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await AdminService.getAllAdmins(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admins retrieved successfully.',
    data: result,
  });
});

//get single admin by Id
const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.getSingleAdmin(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin retrieved successfully.',
    data: result,
  });
});

// update admin by id
const updateAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await AdminService.updateAdminById(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin updated successfully.',
    data: result,
  });
});

// delete admin by id
const deleteAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.deleteAdminById(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin deleted successfully.',
    data: result,
  });
});

const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdminById,
  deleteAdminById,
};

export default AdminController;
