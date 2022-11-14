import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EmpresaRecicladora, EmpresaRecicladoraRelations, Recolector, Administrador} from '../models';
import {RecolectorRepository} from './recolector.repository';
import {AdministradorRepository} from './administrador.repository';

export class EmpresaRecicladoraRepository extends DefaultCrudRepository<
  EmpresaRecicladora,
  typeof EmpresaRecicladora.prototype.RazonSocial,
  EmpresaRecicladoraRelations
> {

  public readonly su_RecolectSor: HasManyRepositoryFactory<Recolector, typeof EmpresaRecicladora.prototype.RazonSocial>;

  public readonly Su_administrador: BelongsToAccessor<Administrador, typeof EmpresaRecicladora.prototype.RazonSocial>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RecolectorRepository') protected recolectorRepositoryGetter: Getter<RecolectorRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(EmpresaRecicladora, dataSource);
    this.Su_administrador = this.createBelongsToAccessorFor('Su_administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('Su_administrador', this.Su_administrador.inclusionResolver);
    this.su_RecolectSor = this.createHasManyRepositoryFactoryFor('su_RecolectSor', recolectorRepositoryGetter,);
    this.registerInclusionResolver('su_RecolectSor', this.su_RecolectSor.inclusionResolver);
  }
}
