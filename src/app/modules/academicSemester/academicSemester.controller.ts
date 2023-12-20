import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AcademicSemesterService from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterData = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      semesterData
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic semester created successfully.',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
