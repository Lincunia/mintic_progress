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
  Purchase,
  Product,
} from '../models';
import {PurchaseRepository} from '../repositories';

export class PurchaseProductController {
  constructor(
    @repository(PurchaseRepository) protected purchaseRepository: PurchaseRepository,
  ) { }

  @get('/purchases/{id}/product', {
    responses: {
      '200': {
        description: 'Purchase has one Product',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product> {
    return this.purchaseRepository.product(id).get(filter);
  }

  @post('/purchases/{id}/product', {
    responses: {
      '200': {
        description: 'Purchase model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Purchase.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInPurchase',
            exclude: ['id'],
            optional: ['purchaseId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.purchaseRepository.product(id).create(product);
  }

  @patch('/purchases/{id}/product', {
    responses: {
      '200': {
        description: 'Purchase.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.purchaseRepository.product(id).patch(product, where);
  }

  @del('/purchases/{id}/product', {
    responses: {
      '200': {
        description: 'Purchase.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.purchaseRepository.product(id).delete(where);
  }
}
