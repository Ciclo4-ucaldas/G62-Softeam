import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Recolector, RecolectorRelations} from '../models';

export class RecolectorRepository extends DefaultCrudRepository<
  Recolector,
  typeof Recolector.prototype.id,
  RecolectorRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Recolector, dataSource);
  }
}
