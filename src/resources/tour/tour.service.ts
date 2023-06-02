import * as toursRepo from './tour.memory.repository';
import * as scheduleRepo from '../schedule/schedule.memory.repository'
import { TTour, TTourModel } from './tour.type'

const getAll = (): Promise<TTourModel[]> => toursRepo.getAll();

const getById = (id: string):Promise<TTourModel | null> => toursRepo.getById(id);

const createTour = (tour: TTour):Promise<TTourModel> =>  toursRepo.createTour(tour);

const deleteById = async (id: string): Promise<TTourModel | null > => {
    const tourDeletable = await getById(id);
    toursRepo.deleteById(id);
    scheduleRepo.deleteByTourId(id);
    return tourDeletable;
}

const updateById = (tour: TTourModel): Promise<TTourModel | null> => toursRepo.updateById(tour);

export { getAll, getById, createTour, deleteById, updateById };
