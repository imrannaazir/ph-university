import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
  page: process.env.PAGE,
  limit: process.env.LIMIT,
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  salt_rounds: process.env.SALT_ROUNDS,
  NODE_ENV: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  my_email_address: process.env.MY_EMAIL_ADDRESS,
  email_app_password: process.env.EMAIL_APP_PASSWORD,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
}
