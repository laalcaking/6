export interface TTour {
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TTourModel extends TTour {
    id: string;
}

export interface TTourResponse extends Omit<TTour, ''> {
    id:string;
}