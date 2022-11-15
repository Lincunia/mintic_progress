import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Licence} from '../models';
import {LicenceRepository} from '../repositories';

export class LicenceController {
  constructor(
    @repository(LicenceRepository)
    public licenceRepository : LicenceRepository,
  ) {}

  @post('/licences')
  @response(200, {
    description: 'Licence model instance',
    content: {'application/json': {schema: getModelSchemaRef(Licence)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licence, {
            title: 'NewLicence',
            exclude: ['id'],
          }),
        },
      },
    })
    licence: Omit<Licence, 'id'>,
  ): Promise<Licence> {
    return this.licenceRepository.create(licence);
  }

  @get('/licences/count')
  @response(200, {
    description: 'Licence model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Licence) where?: Where<Licence>,
  ): Promise<Count> {
    return this.licenceRepository.count(where);
  }

  @get('/licences')
  @response(200, {
    description: 'Array of Licence model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Licence, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Licence) filter?: Filter<Licence>,
  ): Promise<Licence[]> {
    return this.licenceRepository.find(filter);
  }

  @patch('/licences')
  @response(200, {
    description: 'Licence PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licence, {partial: true}),
        },
      },
    })
    licence: Licence,
    @param.where(Licence) where?: Where<Licence>,
  ): Promise<Count> {
    return this.licenceRepository.updateAll(licence, where);
  }

  @get('/licences/{id}')
  @response(200, {
    description: 'Licence model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Licence, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Licence, {exclude: 'where'}) filter?: FilterExcludingWhere<Licence>
  ): Promise<Licence> {
    return this.licenceRepository.findById(id, filter);
  }

  @patch('/licences/{id}')
  @response(204, {
    description: 'Licence PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licence, {partial: true}),
        },
      },
    })
    licence: Licence,
  ): Promise<void> {
    await this.licenceRepository.updateById(id, licence);
  }

  @put('/licences/{id}')
  @response(204, {
    description: 'Licence PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() licence: Licence,
  ): Promise<void> {
    await this.licenceRepository.replaceById(id, licence);
  }

  @del('/licences/{id}')
  @response(204, {
    description: 'Licence DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.licenceRepository.deleteById(id);
  }
}
