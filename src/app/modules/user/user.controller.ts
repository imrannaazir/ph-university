import { Request, Response } from 'express';

const createStudent = async (req: Request, res: Response) => {
  const { password } = req.body;
};

export const UserController = {
  createStudent,
};
