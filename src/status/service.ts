import Status from "./model";

export default class StatusService {
  public addStatus = async (input: any) => {
    return await Status.create(input);
  };

  public findStatusesByOptions = async (options: any = {}) => {
    return await Status.findAll(options);
  };

  public findStatusByOptions = async (options: any) => {
    return await Status.findOne(options);
  };
  public findStatusById = async (_id: number) => {
    return await Status.findByPk(_id);
  };
}
