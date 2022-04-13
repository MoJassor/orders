import User from "./model";

export default class UserService {
  public addUser = async (input: any) => {
    return await User.create(input);
  };

  public findUsersByOptions = async (options: any = {}) => {
    return await User.findAll(options);
  };

  public findUserByOptions = async (options: any) => {
    return await User.findOne(options);
  };
  public findUserById = async (_id: number) => {
    return await User.findByPk(_id);
  };
}
