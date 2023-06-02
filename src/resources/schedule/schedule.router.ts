import { Router, Request, Response } from 'express';
import Schedule from './schedule.model';
import * as scheduleService from './schedule.service';
// import { getByScheduledId } from '../price/price.memory.repository';

const router = Router();

router.route('/').get(async (_, res: Response) => {
  const schedules = await scheduleService.getAll();
  res.render('schedules', { schedules });
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await scheduleService.getById(id || '');

  if (schedule) {
    res.json(Schedule.toResponse(schedule));
  } else {
    res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
  }
});

// router.route('/:id/prices').get(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const schedule = await getByScheduledId(id || '');

//   if (schedule) {
//     res.json(Schedule.toResponse(schedule));
//   } else {
//     res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
//   }
// });

router.route('/').post(async (req: Request, res: Response) => {
  const { productID, isActive, startDate, endDate } = req.body;

  const schedule = await scheduleService.createSchedule({ productID, isActive, startDate, endDate, createdAt: '', updatedAt: ''});

  if (schedule) {
    res.redirect('/schedules');
  } else {
    res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
  }
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productID, isActive, startDate, endDate } = req.body;

  const schedule = await scheduleService.updateById({ id: id || '', productID, isActive, startDate, endDate, createdAt: '', updatedAt: '' });

  if (schedule) {
    res.redirect('/schedule');
  } else {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await scheduleService.deleteById(id || '');
  } catch (err) {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
});

export default router;
