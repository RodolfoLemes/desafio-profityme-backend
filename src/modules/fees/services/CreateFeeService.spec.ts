import FakeFeesRepository from '../repositories/implementations/FakeFeesRepository';
import CreateFeeService from './CreateFeeService';
import AppError from '../../../errors/AppError';

let feesRepository: FakeFeesRepository;
let createFeeService: CreateFeeService;

describe('create fee', () => {
  beforeEach(() => {
    feesRepository = new FakeFeesRepository();

    createFeeService = new CreateFeeService(feesRepository);
  });

  it('should create a default fee', async () => {
    const fee = await createFeeService.execute({
      percentageAmount: 10,
      isDefault: true,
    });

    expect(fee.id).toBeTruthy();
    expect(fee.percentageAmount).toBe(10);
    expect(fee.isDefault).toBeTruthy();
    expect(fee.endDate).toBeUndefined();
    expect(fee.startDate).toBeUndefined();
  });

  it('should create a not default fee', async () => {
    const fee = await createFeeService.execute({
      percentageAmount: 10,
      isDefault: false,
      startDate: '2019-07-17T15:59:59Z',
      endDate: '2019-07-17T15:59:59Z',
    });

    expect(fee.id).toBeTruthy();
    expect(fee.percentageAmount).toBe(10);
    expect(fee.isDefault).toBeFalsy();
    expect(fee.endDate).toEqual(new Date('2019-07-18T02:59:59.999Z'));
    expect(fee.startDate).toEqual(new Date('2019-07-17T03:00:00.000Z'));
  });

  it('should not create two default fees', async () => {
    await createFeeService.execute({
      percentageAmount: 10,
      isDefault: true,
    });

    await expect(
      createFeeService.execute({
        percentageAmount: 15,
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create fees in the same period', async () => {
    await createFeeService.execute({
      percentageAmount: 10,
      isDefault: false,
      startDate: '2019-07-17T15:59:59Z',
      endDate: '2019-07-17T15:59:59Z',
    });

    await expect(
      createFeeService.execute({
        percentageAmount: 10,
        isDefault: false,
        startDate: '2019-07-17T15:59:59Z',
        endDate: '2019-07-17T15:59:59Z',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
