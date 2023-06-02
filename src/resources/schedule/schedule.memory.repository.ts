import { v4 as uuidv4 } from 'uuid';
import Schedule from './schedule.model';
import { TScheduleModel, TSchedule} from './schedule.type'

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const Schedules: Schedule[] = [
  new Schedule({id: uuidv4(), productID: 'test', isActive: true, startDate:'2020-1-1', endDate:'2020-1-2', createdAt:'2020-1-1', updatedAt:'2020-1-2'})
];

const getAll = async (): Promise<TScheduleModel[]> => Schedules;

const getById = async (id: string): Promise<TScheduleModel | null> => Schedules.find((schedule) => schedule.id === id ) || null;

const getByTourId = async (productID: string): Promise<TScheduleModel | null> => Schedules.find((schedule) => schedule.productID === productID) || null;

const createSchedule = async ({ productID, isActive, startDate, endDate }: TSchedule): Promise<TScheduleModel> => {
  const schedule = new Schedule({id:uuidv4(), productID, isActive, startDate, endDate});
  Schedules.push(schedule);
  return schedule;
}

const deleteById = async (id: string): Promise<TScheduleModel | null> => {
  const scheduleIndex = Schedules.findIndex((schedule) => schedule.id === id);
  if (scheduleIndex === -1) return null; 
  
  const deletedSchedule = Schedules[scheduleIndex];
  Schedules.splice(scheduleIndex, 1);
  return deletedSchedule!;
}

const updateById = async ({id, productID, isActive, startDate, endDate }: TScheduleModel): Promise<TScheduleModel | null> => {
  const scheduleIndex = Schedules.findIndex((schedule) => schedule.id === id);
  if (scheduleIndex === -1) return null; 

  const now = new Date();
  const oldSchedule = Schedules[scheduleIndex]; 
  const newSchedule: Schedule = {...oldSchedule, productID, isActive, startDate, endDate, createdAt: '', updatedAt: formatter.format(now), id };

  Schedules.splice(scheduleIndex, 1, newSchedule);
  return newSchedule;
}

const deleteByTourId = async (productID: string): Promise<void> => {
  const schedulesToDelete = Schedules.filter((schedule) => schedule.productID === productID);

  await Promise.allSettled(
    schedulesToDelete.map(async (schedule) => deleteById(schedule.id))
  );
}

export { Schedules, getAll, getById, createSchedule, deleteById, updateById, deleteByTourId, getByTourId };
