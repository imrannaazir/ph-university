import User from '../user/user.model';

const getLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .lean()
    .sort({ createdAt: -1 });
  return lastFaculty?.id ? lastFaculty?.id : undefined;
};

export const generateFacultyId = async () => {
  let currentFacultyCode = (0).toString().padStart(4, '0');
  const currentFacultyId = await getLastFacultyId();
  if (currentFacultyId) {
    currentFacultyCode = currentFacultyId?.substring(2) as string;
  }
  const incrementedFacultyCode = Number(currentFacultyCode) + 1;
  const nextFacultyCode =
    incrementedFacultyCode.toString().padStart(4, '0') ||
    (0).toString().padStart(4, '0');

  const nextFacultyId = `A-${nextFacultyCode}`;

  return nextFacultyId;
};
