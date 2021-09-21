import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateFeeService from '../services/CreateFeeService';
import ListFeesService from '../services/ListFeesService';

export default class FeesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      percentage_amount: percentageAmount,
      is_default: isDefault,
      start_date: startDate,
      end_date: endDate,
    } = req.body;

    const createFee = container.resolve(CreateFeeService);

    const fee = await createFee.execute({
      percentageAmount,
      isDefault,
      startDate,
      endDate,
    });

    return res.status(201).json(classToClass(fee));
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const listFees = container.resolve(ListFeesService);

    const fee = await listFees.execute();

    return res.json(classToClass(fee));
  }
}
