import { inject, injectable } from 'tsyringe';
import Fee from '../entities/Fee';
import IFeesRepository from '../repositories/IFeesRepository';

@injectable()
export default class ListFeesService {
  constructor(
    @inject('FeesRepository')
    private feesRepository: IFeesRepository,
  ) {}

  public async execute(): Promise<Fee[]> {
    return this.feesRepository.find();
  }
}
