import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create user";
    res.status(400).json({
      success: false,
      error: message,
    });
  }
};
