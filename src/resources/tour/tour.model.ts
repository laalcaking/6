import { v4 as uuidv4 } from 'uuid';
import { TTourModel, TTourResponse } from './tour.type'

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

class Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  constructor({ id = uuidv4(),
    title = 'Test',
    slug = 'tset',
    description = 'description',
    isActive = false,
    createdAt = formatter.format(new Date()),
    updatedAt = formatter.format(new Date())
  } = {}) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static toResponse(tour: TTourModel): TTourResponse {
    const { id, title, slug, description, isActive, createdAt, updatedAt } = tour;
    return { id, title, slug, description, isActive, createdAt, updatedAt };
  }
}

export default Tour;
