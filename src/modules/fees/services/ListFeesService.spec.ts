import FakeFeesRepository from '../repositories/implementations/FakeFeesRepository';
import ListFeesService from './ListFeesService';

let feesRepository: FakeFeesRepository;
let listFees: ListFeesService;

describe('list fees', () => {
  beforeEach(async () => {
    feesRepository = new FakeFeesRepository();
    listFees = new ListFeesService(feesRepository);

    await Promise.all([
      feesRepository.create({
        percentageAmount: 10,
        isDefault: true,
      }),
      feesRepository.create({
        percentageAmount: 15,
        startDate: new Date('2019-07-17T15:59:59Z'),
        endDate: new Date('2019-07-17T15:59:59Z'),
        isDefault: false,
      }),
    ]);
  });

  it('should list fees', async () => {
    const listedFees = await listFees.execute();

    expect(listedFees.length).toBeTruthy();
  });
});
