import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehicle} from './vehicle.model';

@model()
export class Licence extends Entity {
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
  number: number;

  @property({
    type: 'string',
    required: true,
  })
  names: string;

  @property({
    type: 'number',
    required: true,
  })
  identification: number;

  @property({
    type: 'string',
    required: true,
  })
  constraints: string;

  @property({
    type: 'string',
    required: true,
  })
  organization: string;

  @property({
    type: 'date',
    required: true,
  })
  date_of_birth: string;

  @property({
    type: 'date',
    required: true,
  })
  expedition_date: string;

  @property({
    type: 'string',
  })
  driverId?: string;

  @belongsTo(() => Vehicle)
  vehicleId: string;

  constructor(data?: Partial<Licence>) {
    super(data);
  }
}

export interface LicenceRelations {
  // describe navigational properties here
}

export type LicenceWithRelations = Licence & LicenceRelations;
