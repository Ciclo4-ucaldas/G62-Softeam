import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EmpresaRecicladora, EmpresaRecicladoraRelations, Recolector} from '../models';
import {RecolectorRepository} from './recolector.repository';

export class EmpresaRecicladoraRepository extends DefaultCrudRepository<
  EmpresaRecicladora,
  typeof EmpresaRecicladora.prototype.RazonSocial,
  EmpresaRecicladoraRelations
> {

  public readonly su_RecolectSor: HasManyRepositoryFactory<Recolector, typeof EmpresaRecicladora.prototype.RazonSocial>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RecolectorRepository') protected recolectorRepositoryGetter: Getter<RecolectorRepository>,
  ) {
    super(EmpresaRecicladora, dataSource);
    this.su_RecolectSor = this.createHasManyRepositoryFactoryFor('su_RecolectSor', recolectorRepositoryGetter,);
    this.registerInclusionResolver('su_RecolectSor', this.su_RecolectSor.inclusionResolver);
  }
}
