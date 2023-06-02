import * as priceRepo from './price.memory.repository';
import { TPriceModel, TPrice } from './price.type';

const getAll = async (): Promise<TPriceModel[]> => priceRepo.getAll();

const getById = async (id: string): Promise<TPriceModel | null> => priceRepo.getById(id);

const createPrice = async (price: TPrice):Promise<TPriceModel> => priceRepo.createPrice(price);

const deleteById = async (id: string):Promise<TPriceModel | null > => {
  const priceDeletable = await getById(id);
  priceRepo.deleteById(id);
  return priceDeletable;
};

const updateById = async (price: TPriceModel): Promise<TPriceModel | null > => priceRepo.updateById(price);

export { getAll, getById, createPrice, deleteById, updateById };

