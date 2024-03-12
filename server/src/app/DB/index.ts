import config from '../config'
import { USER_ROLES } from '../modules/user/user.constant'
import User from '../modules/user/user.model'

const superAdmin = {
  id: '0001',
  role: USER_ROLES.superAdmin,
  email: config.my_email_address,
  password: config.super_admin_password,
  needsPasswordChange: false,
}
const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({ role: USER_ROLES.superAdmin })
  if (!isSuperAdminExist) {
    await User.create(superAdmin)
  }
}

export default seedSuperAdmin
