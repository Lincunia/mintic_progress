import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Person} from './person.model';

@model()
export class Purchase extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @hasOne(() => Product)
  product: Product;

  @belongsTo(() => Person)
  personId: string;

  constructor(data?: Partial<Purchase>) {
    super(data);
  }
}

export interface PurchaseRelations {
  // describe navigational properties here
}

export type PurchaseWithRelations = Purchase & PurchaseRelations;
