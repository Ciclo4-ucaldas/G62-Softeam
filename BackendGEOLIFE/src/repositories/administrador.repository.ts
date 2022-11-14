import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, EmpresaRecicladora} from '../models';
import {EmpresaRecicladoraRepository} from './empresa-recicladora.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly suEmpresaRecicladora: HasOneRepositoryFactory<EmpresaRecicladora, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRecicladoraRepository') protected empresaRecicladoraRepositoryGetter: Getter<EmpresaRecicladoraRepository>,
  ) {
    super(Administrador, dataSource);
    this.suEmpresaRecicladora = this.createHasOneRepositoryFactoryFor('suEmpresaRecicladora', empresaRecicladoraRepositoryGetter);
    this.registerInclusionResolver('suEmpresaRecicladora', this.suEmpresaRecicladora.inclusionResolver);
  }
}
