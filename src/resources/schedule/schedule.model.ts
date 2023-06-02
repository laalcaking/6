import { v4 as uuidv4 } from 'uuid';
import { TScheduleModel, TScheduleResponse } from './schedule.type'

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

class Schedule {
  id: string;
  productID: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;

  constructor({
    id = uuidv4(),
    productID = 'Test', 
    isActive = false,
    startDate = '2020-01-02',
    endDate = '2020-01-03',
    createdAt = formatter.format(new Date()),
    updatedAt = formatter.format(new Date()),
  } = {}) {
    this.id = id;
    this.productID = productID;
    this.isActive = isActive;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static toResponse(schedule: TScheduleModel): TScheduleResponse {
    const { id, productID, isActive, startDate, endDate, createdAt, updatedAt } = schedule;
    return { id, productID, isActive, startDate, endDate, createdAt, updatedAt };
  }
}

export default Schedule;