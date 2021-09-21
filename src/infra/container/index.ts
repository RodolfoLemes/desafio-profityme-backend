import { container } from 'tsyringe';

import IFeesRepository from '../../modules/fees/repositories/IFeesRepository';
import TypeORMFeesRepository from '../../modules/fees/repositories/implementations/TypeORMFeesRepository';

container.registerSingleton<IFeesRepository>(
  'FeesRepository',
  TypeORMFeesRepository,
);
