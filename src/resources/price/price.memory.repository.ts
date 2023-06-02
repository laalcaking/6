import { v4 as uuidv4 } from 'uuid';
import { TPriceModel, TPrice } from './price.type';
import Price from './price.model';

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const Prices: TPriceModel[] = [
];

const getAll = async (): Promise<TPriceModel[]> => Prices;

const getById = async (id: string): Promise<TPriceModel | null> => Prices.find((price) => price.id === id) || null;

const getByScheduledId = async (scheduleID: string): Promise<TPriceModel | null> => Prices.find((price) => price.scheduleID === scheduleID) || null;

const createPrice = async ({ scheduleID, priceValue, priceCurrency }: TPrice): Promise<TPriceModel> => {
  const price = new Price({ id: uuidv4(), scheduleID, priceValue, priceCurrency });
  Prices.push(price);
  return price;
};

const deleteById = async (id: string): Promise<TPriceModel | null> => {
  const pricePosition = Prices.findIndex((price) => price.id === id);
  if (pricePosition === -1) return null;

  const priceDeletable = Prices[pricePosition];
  Prices.splice(pricePosition, 1);
  return priceDeletable!;
};

const updateById = async ({ id, scheduleID, priceValue, priceCurrency, createdAt }: TPriceModel): Promise<TPriceModel | null> => {
  const pricePosition = Prices.findIndex((price) => price.id === id);
  if (pricePosition === -1) return null;

  const now = new Date();
  const oldPrice = Prices[pricePosition];
  const newPrice = { ...oldPrice, scheduleID, priceValue, priceCurrency, createdAt, updatedAt: formatter.format(now), id };

  Prices.splice(pricePosition, 1, newPrice);
  return newPrice!;
};

const deleteScheduleId = async (scheduleID: string): Promise<void> => {
  const schedule = Prices.filter((price) => price.scheduleID === scheduleID);

  await Promise.allSettled(schedule.map(async (price) => deleteById(price.id)));
};

export { getAll, getById, createPrice, deleteById, updateById, deleteScheduleId, getByScheduledId };
