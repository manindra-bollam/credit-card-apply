import User from "../models/User";

export const createUser = async (data: any) => {
  const user = new User(data);
  return await user.save();
};
