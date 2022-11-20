import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MonguitoDataSource} from '../datasources';
import {Person, PersonRelations} from '../models';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {
  constructor(
    @inject('datasources.monguito') dataSource: MonguitoDataSource,
  ) {
    super(Person, dataSource);
  }
}
