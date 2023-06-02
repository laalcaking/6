import { Router, Request, Response } from 'express';
import Tour from './tour.model';
import * as tourService from './tour.service';
// import { getByTourId } from '../schedule/schedule.memory.repository';

const router = Router();

router.route('/').get(async (_, res: Response) => {
  const tours = await tourService.getAll();
  res.render('tours', { tours });
});

router.route('/').post(async (req: Request, res: Response) => {
  const { title, slug, description, isActive } = req.body;

  const tour = await tourService.createTour({ title, slug, description, isActive, createdAt: '', updatedAt: '' });

  if (tour) {
    res.redirect('/tours');
  } else {
    res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
  }
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;

  const price = await tourService.getById(id || '');

  if (price) {
    res.json(Tour.toResponse(price));
  } else {
    res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
  }
});

// router.route('/:id/schedules').get(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const prices = await getByTourId(id || '');

//   if (prices) {
//     res.json(Tour.toResponse(prices));
//   } else {
//     res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
//   }
// });

router.route('/:id').put(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, description, isActive } = req.body;

  const price = await tourService.updateById({ id: id || '', title, slug, description, isActive, createdAt: '', updatedAt: '' });

  if (price) {
    res.redirect('/tours');
  } else {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await tourService.deleteById(id || '');
  } catch (err) {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
});

export default router;
