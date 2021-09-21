import { v4 as uuidv4 } from 'uuid';
import Fee from '../../entities/Fee';
import IFeesRepository from '../IFeesRepository';
import ICreateFeeDTO from '../../dtos/ICreateFeeDTO';
import IHasFeeInThePeriodDTO from '../../dtos/IHasFeeInThePeriodDTO';

class FakeFeesRepository implements IFeesRepository {
  private fees: Fee[] = [];

  public async create(data: ICreateFeeDTO): Promise<Fee> {
    const fee = new Fee();

    Object.assign(fee, { ...data, id: uuidv4() });

    this.fees.push(fee);

    return fee;
  }

  public async save(fee: Fee): Promise<Fee> {
    const index = this.fees.findIndex(findFee => findFee.id === fee.id);

    this.fees[index] = fee;

    return fee;
  }

  public async find(): Promise<Fee[]> {
    return this.fees;
  }

  public async findById(feeId: string): Promise<Fee | undefined> {
    return this.fees.find(fee => fee.id === feeId);
  }

  public async hasDefaultFee(): Promise<boolean> {
    return !!this.fees.find(fee => fee.isDefault === true);
  }

  public async hasFeeInThePeriod({
    startDate,
    endDate,
  }: IHasFeeInThePeriodDTO): Promise<boolean> {
    return !!this.fees.find(
      fee =>
        fee.startDate.getTime() === startDate.getTime() &&
        fee.endDate.getTime() === endDate.getTime(),
    );
  }
}

export default FakeFeesRepository;
