import User from '../user/user.model';

// generate Id
const getCurrentAdminId = async () => {
  const currentUser = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .lean()
    .sort({ createdAt: -1 });

  return currentUser?.id;
};

const generateAdminId = async () => {
  let currentAdminCode = (0).toString().padStart(4, '0');

  const currentAdminId = await getCurrentAdminId();

  if (currentAdminId) {
    currentAdminCode = currentAdminId.substring(2);
  }

  const nextAdminCode = (Number(currentAdminCode) + 1)
    .toString()
    .padStart(4, '0');

  return `A-${nextAdminCode}`;
};

export default generateAdminId;
