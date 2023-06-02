export interface TPrice {
  scheduleID: string;
  priceValue: number;
  priceCurrency: number;
  createdAt: string;
  updatedAt: string;
}

export interface TPriceModel extends TPrice {
  id: string;
}

export interface TPriceResponse extends Omit<TPrice, ''> {
  id: string;
}