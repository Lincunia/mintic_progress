import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Purchase,
  Person,
} from '../models';
import {PurchaseRepository} from '../repositories';

export class PurchasePersonController {
  constructor(
    @repository(PurchaseRepository)
    public purchaseRepository: PurchaseRepository,
  ) { }

  @get('/purchases/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Purchase',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Purchase.prototype.id,
  ): Promise<Person> {
    return this.purchaseRepository.person(id);
  }
}
