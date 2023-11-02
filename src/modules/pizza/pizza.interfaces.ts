
type Size = 'PEQUENO' | 'MEDIANO' | 'GRANDE'

export interface Pizza {
  name: string;
  description?: string;
  price: number;
  size: Size
}