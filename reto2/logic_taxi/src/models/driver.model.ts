import {Entity, model, property, hasOne} from '@loopback/repository';
import {Licence} from './licence.model';

@model()
export class Driver extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  names: string;

  @property({
    type: 'string',
    required: true,
  })
  surnames: string;

  @property({
    type: 'number',
    required: true,
  })
  identification: number;

  @property({
    type: 'string',
    required: true,
  })
  experience: string;

  @hasOne(() => Licence)
  licence: Licence;

  constructor(data?: Partial<Driver>) {
    super(data);
  }
}

export interface DriverRelations {
  // describe navigational properties here
}

export type DriverWithRelations = Driver & DriverRelations;
