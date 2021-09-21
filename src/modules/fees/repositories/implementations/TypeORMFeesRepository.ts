import { Repository, getRepository } from 'typeorm';
import Fee from '../../entities/Fee';
import ICreateFeeDTO from '../../dtos/ICreateFeeDTO';
import IFeesRepository from '../IFeesRepository';
import IHasFeeInThePeriodDTO from '../../dtos/IHasFeeInThePeriodDTO';

class TypeORMFeesRepository implements IFeesRepository {
  private ormRepository: Repository<Fee>;

  constructor() {
    this.ormRepository = getRepository(Fee);
  }

  public async create(data: ICreateFeeDTO): Promise<Fee> {
    const fee = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(fee);

    return fee;
  }

  public async save(fee: Fee): Promise<Fee> {
    return this.ormRepository.save(fee);
  }

  public async find(): Promise<Fee[]> {
    return this.ormRepository.find();
  }

  public async findById(feeId: string): Promise<Fee | undefined> {
    const fee = await this.ormRepository.findOne({ where: { id: feeId } });

    return fee;
  }

  public async hasDefaultFee(): Promise<boolean> {
    const fee = await this.ormRepository.findOne({
      where: {
        isDefault: true,
      },
    });

    return !!fee;
  }

  public async hasFeeInThePeriod({
    startDate,
    endDate,
  }: IHasFeeInThePeriodDTO): Promise<boolean> {
    const fee = await this.ormRepository.findOne({
      where: {
        startDate,
        endDate,
      },
    });

    return !!fee;
  }
}

export default TypeORMFeesRepository;
