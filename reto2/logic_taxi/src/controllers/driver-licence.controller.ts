import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Driver,
  Licence,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverLicenceController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/licence', {
    responses: {
      '200': {
        description: 'Driver has one Licence',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Licence),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Licence>,
  ): Promise<Licence> {
    return this.driverRepository.licence(id).get(filter);
  }

  @post('/drivers/{id}/licence', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Licence)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Driver.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licence, {
            title: 'NewLicenceInDriver',
            exclude: ['id'],
            optional: ['driverId']
          }),
        },
      },
    }) licence: Omit<Licence, 'id'>,
  ): Promise<Licence> {
    return this.driverRepository.licence(id).create(licence);
  }

  @patch('/drivers/{id}/licence', {
    responses: {
      '200': {
        description: 'Driver.Licence PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licence, {partial: true}),
        },
      },
    })
    licence: Partial<Licence>,
    @param.query.object('where', getWhereSchemaFor(Licence)) where?: Where<Licence>,
  ): Promise<Count> {
    return this.driverRepository.licence(id).patch(licence, where);
  }

  @del('/drivers/{id}/licence', {
    responses: {
      '200': {
        description: 'Driver.Licence DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Licence)) where?: Where<Licence>,
  ): Promise<Count> {
    return this.driverRepository.licence(id).delete(where);
  }
}
