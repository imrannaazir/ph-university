export const USER_ROLES = {
  student: 'student',
  admin: 'admin',
  faculty: 'faculty',
  superAdmin: 'superAdmin',
} as const

export const UserRoles = ['student', 'faculty', 'admin', 'superAdmin'] as const

export const Status = ['active', 'blocked']
