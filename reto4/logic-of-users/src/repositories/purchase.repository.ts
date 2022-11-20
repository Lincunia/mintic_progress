import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MonguitoDataSource} from '../datasources';
import {Purchase, PurchaseRelations, Product, Person} from '../models';
import {ProductRepository} from './product.repository';
import {PersonRepository} from './person.repository';

export class PurchaseRepository extends DefaultCrudRepository<
  Purchase,
  typeof Purchase.prototype.id,
  PurchaseRelations
> {

  public readonly product: HasOneRepositoryFactory<Product, typeof Purchase.prototype.id>;

  public readonly person: BelongsToAccessor<Person, typeof Purchase.prototype.id>;

  constructor(
    @inject('datasources.monguito') dataSource: MonguitoDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Purchase, dataSource);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
    this.product = this.createHasOneRepositoryFactoryFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
