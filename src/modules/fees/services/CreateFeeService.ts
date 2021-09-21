import { inject, injectable } from 'tsyringe';
import { addHours } from 'date-fns';
import IFeesRepository from '../repositories/IFeesRepository';
import AppError from '../../../errors/AppError';
import Fee from '../entities/Fee';

export interface IRequest {
  percentageAmount: number;
  isDefault: boolean;
  startDate?: string;
  endDate?: string;
}

@injectable()
export default class CreateFeeService {
  constructor(
    @inject('FeesRepository')
    private feesRepository: IFeesRepository,
  ) {}

  public async execute({
    percentageAmount,
    isDefault,
    startDate,
    endDate,
  }: IRequest): Promise<Fee> {
    if (isDefault) {
      const hasDefaultFee = await this.feesRepository.hasDefaultFee();

      if (hasDefaultFee) {
        throw new AppError('default-fee-already-inserted');
      }

      const fee = await this.feesRepository.create({
        percentageAmount,
        isDefault,
      });

      return fee;
    }

    const typedStartDate = new Date(startDate as string);
    const typedEndDate = new Date(endDate as string);

    typedStartDate.setUTCHours(0, 0, 0, 0);
    typedEndDate.setUTCHours(23, 59, 59, 999);

    const formattedStartDate = addHours(typedStartDate, 3);

    const formattedEndDate = addHours(typedEndDate, 3);

    const hasFeeInThePeriod = await this.feesRepository.hasFeeInThePeriod({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    if (hasFeeInThePeriod) {
      throw new AppError('invalid-fee-period');
    }

    const fee = await this.feesRepository.create({
      percentageAmount,
      isDefault,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    return fee;
  }
}
