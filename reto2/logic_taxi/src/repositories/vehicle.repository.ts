import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RongomongoDataSource} from '../datasources';
import {Vehicle, VehicleRelations} from '../models';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.id,
  VehicleRelations
> {
  constructor(
    @inject('datasources.rongomongo') dataSource: RongomongoDataSource,
  ) {
    super(Vehicle, dataSource);
  }
}
