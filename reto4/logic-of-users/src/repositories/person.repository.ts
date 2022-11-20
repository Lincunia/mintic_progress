import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MonguitoDataSource} from '../datasources';
import {Person, PersonRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.monguito') dataSource: MonguitoDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Person, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
