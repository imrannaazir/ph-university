export type TUser = {
  id: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  status: 'active' | 'blocked';
};
