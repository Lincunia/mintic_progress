import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Licence,
  Vehicle,
} from '../models';
import {LicenceRepository} from '../repositories';

export class LicenceVehicleController {
  constructor(
    @repository(LicenceRepository)
    public licenceRepository: LicenceRepository,
  ) { }

  @get('/licences/{id}/vehicle', {
    responses: {
      '200': {
        description: 'Vehicle belonging to Licence',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehicle)},
          },
        },
      },
    },
  })
  async getVehicle(
    @param.path.string('id') id: typeof Licence.prototype.id,
  ): Promise<Vehicle> {
    return this.licenceRepository.vehicle(id);
  }
}
