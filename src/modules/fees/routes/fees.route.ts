import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import FeesController from '../controllers/FeesController';

const feesController = new FeesController();

const router = Router();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      percentage_amount: Joi.number().required(),
      is_default: Joi.boolean().required(),
      start_date: Joi.date(),
      end_date: Joi.date(),
    },
  }),
  feesController.create,
);

router.get('/', feesController.list);

export default router;
