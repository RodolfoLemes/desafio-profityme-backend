import Fee from '../entities/Fee';
import ICreateFeeDTO from '../dtos/ICreateFeeDTO';
import IHasFeeInThePeriodDTO from '../dtos/IHasFeeInThePeriodDTO';

export default interface IFeesRepository {
  create(data: ICreateFeeDTO): Promise<Fee>;
  save(fee: Fee): Promise<Fee>;
  find(): Promise<Fee[]>;
  findById(feeId: string): Promise<Fee | undefined>;
  hasDefaultFee(): Promise<boolean>;
  hasFeeInThePeriod(period: IHasFeeInThePeriodDTO): Promise<boolean>;
}
