import * as scheduleRepo from './schedule.memory.repository';
import * as priceRepo from '../price/price.memory.repository';
import { TScheduleModel, TSchedule} from './schedule.type'

const getAll = (): Promise<TScheduleModel[]> => scheduleRepo.getAll();

const getById = (id: string):Promise<TScheduleModel | null>  => scheduleRepo.getById(id);

const createSchedule = (schedule: TSchedule):Promise<TScheduleModel> => scheduleRepo.createSchedule(schedule);

const deleteById = async (id: string):Promise<TScheduleModel | null> => {
    const priceDeletable = await getById(id);
    scheduleRepo.deleteById(id);
    priceRepo.deleteScheduleId(id);
    return priceDeletable;
}

const updateById = (schedule: TScheduleModel):Promise<TScheduleModel | null> => scheduleRepo.updateById(schedule);

export { getAll, getById, createSchedule, deleteById, updateById };