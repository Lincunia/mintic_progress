import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {RongomongoDataSource} from '../datasources';
import {Driver, DriverRelations, Licence} from '../models';
import {LicenceRepository} from './licence.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {

  public readonly licence: HasOneRepositoryFactory<Licence, typeof Driver.prototype.id>;

  constructor(
    @inject('datasources.rongomongo') dataSource: RongomongoDataSource, @repository.getter('LicenceRepository') protected licenceRepositoryGetter: Getter<LicenceRepository>,
  ) {
    super(Driver, dataSource);
    this.licence = this.createHasOneRepositoryFactoryFor('licence', licenceRepositoryGetter);
    this.registerInclusionResolver('licence', this.licence.inclusionResolver);
  }
}
