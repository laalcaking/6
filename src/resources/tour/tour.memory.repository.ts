import { v4 as uuidv4 } from 'uuid';
import Tour from './tour.model';
import { TTour, TTourModel } from './tour.type'

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const Tours: Tour[] = [
  new Tour({ id: uuidv4(), title: '1', slug: '1', description: '1', isActive: true, createdAt: '2020-1-1', updatedAt: '2020-1-2' })
];

const getAll = async (): Promise<TTourModel[]> => Tours;

const getById = async (id: string): Promise<TTourModel | null> => Tours.find((tour) => tour.id === id) || null;

const createTour = async ({ title, slug, description, isActive }: TTour): Promise<TTourModel> => {
  const tour = new Tour({ id: uuidv4(), title, slug, description, isActive });
  Tours.push(tour);
  return tour;
};

const deleteById = async (id: string): Promise<TTourModel | null> => {
  const tourPosition = Tours.findIndex((tour) => tour.id === id);
  if (tourPosition === -1) return null;

  const tourDeletable = Tours[tourPosition];
  Tours.splice(tourPosition, 1);
  return tourDeletable!;
};

const updateById = async ({ id, title, slug, description, isActive }: TTourModel): Promise<TTourModel | null> => {
  const tourPosition = Tours.findIndex((tour) => tour.id === id);
  if (tourPosition === -1) return null;

  const now = new Date();
  const oldTour = Tours[tourPosition];
  const newTour: Tour = { ...oldTour, title, slug, description, isActive, updatedAt: formatter.format(now), createdAt: '', id };

  Tours.splice(tourPosition, 1, newTour);
  return newTour;
};

export { Tours, getAll, getById, createTour, deleteById, updateById };
