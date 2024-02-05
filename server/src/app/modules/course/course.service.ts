/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculties } from './course.interface';
import Course, { CourseFaculties } from './course.model';
import mongoose from 'mongoose';
import config from '../../config';

// create course
const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// get all course
const getAllCourse = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisites.course'),
    query
  )
    .search(CourseSearchableFields)
    .filters()
    .sort()
    .fields()
    .paginate();

  const result = await courseQuery.modelQuery;

  if (!result.length)
    throw new AppError(StatusCodes.NOT_FOUND, 'No courses founded.');

  return result;
};

// get single course by Id
const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisites.course');

  if (!result?._id)
    throw new AppError(StatusCodes.NOT_FOUND, `Course not founded by Id:${id}`);
  return result;
};

// update course by Id
const updateCourseById = async (id: string, payload: Partial<TCourse>) => {
  // check if course exist
  const isCourseExist = await Course.findById(id);
  if (!isCourseExist?._id)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Course not founded by Id: ${id}`
    );

  const { preRequisites, ...remainingData } = payload;

  // create session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // update primitive values

    // transaction 1
    const updatedPrimitiveCourseData = await Course.findByIdAndUpdate(
      id,
      remainingData,
      { new: true, runValidators: true, session }
    );

    if (!updatedPrimitiveCourseData)
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to update primitive values of  course. '
      );

    // if payload carries prerequisites
    if (preRequisites && preRequisites.length > 0) {
      const preRequisitesToDelete = preRequisites
        .filter((elm) => elm.course && elm.isDeleted)
        .map((elm) => elm.course);

      // delete pre requisite course from course
      // transaction 2
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisites: { course: { $in: preRequisitesToDelete } },
          },
        },
        { new: true, runValidators: true, session }
      );

      if (!deletedPreRequisiteCourses)
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Failed to remove preRequisite courses from Course.`
        );

      const preRequisiteCoursesToAdd = preRequisites.filter(
        (elm) => elm.course && !elm.isDeleted
      );

      // transaction 3
      const preRequisiteAddedCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisites: {
              $each: preRequisiteCoursesToAdd,
            },
          },
        },
        { new: true, runValidators: true, session }
      );

      if (!preRequisiteAddedCourse)
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'Failed to add pre requisites to course.'
        );
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      config.NODE_ENV === 'development'
        ? error.message
        : 'Failed to update course.'
    );
  }
};

// delete course by ID
const deleteCourseById = async (id: string) => {
  // check course existence
  const isCourseExist = await Course.findById(id);
  if (!isCourseExist?._id)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Course not founded by Id : ${id}`
    );

  const deletedCourse = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedCourse?._id)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete course.');

  return {
    deletedCourseId: deletedCourse._id,
  };
};

// assign faculties on course
const assignFacultiesOnCourse = async (
  id: string,
  payload: TCourseFaculties
) => {
  const courseFaculties = await CourseFaculties.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return courseFaculties;
};

// remove faculties from course
const removeFacultiesFromCourse = async (
  id: string,
  payload: TCourseFaculties
) => {
  const result = await CourseFaculties.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true }
  );

  return result;
};

const CourseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourseById,
  deleteCourseById,
  assignFacultiesOnCourse,
  removeFacultiesFromCourse,
};
export default CourseService;
