import feesRouter from '@modules/fees/routes/fees.route';
import { Router } from 'express';

const routes = Router();

routes.use('/fees', feesRouter);

export default routes;
