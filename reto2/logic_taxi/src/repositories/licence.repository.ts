import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {RongomongoDataSource} from '../datasources';
import {Licence, LicenceRelations, Vehicle} from '../models';
import {VehicleRepository} from './vehicle.repository';

export class LicenceRepository extends DefaultCrudRepository<
  Licence,
  typeof Licence.prototype.id,
  LicenceRelations
> {

  public readonly vehicle: BelongsToAccessor<Vehicle, typeof Licence.prototype.id>;

  constructor(
    @inject('datasources.rongomongo') dataSource: RongomongoDataSource, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>,
  ) {
    super(Licence, dataSource);
    this.vehicle = this.createBelongsToAccessorFor('vehicle', vehicleRepositoryGetter,);
    this.registerInclusionResolver('vehicle', this.vehicle.inclusionResolver);
  }
}
