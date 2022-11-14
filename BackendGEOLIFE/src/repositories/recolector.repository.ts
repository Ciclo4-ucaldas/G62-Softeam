import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Recolector, RecolectorRelations, Servicio, EmpresaRecicladora} from '../models';
import {ServicioRepository} from './servicio.repository';
import {EmpresaRecicladoraRepository} from './empresa-recicladora.repository';

export class RecolectorRepository extends DefaultCrudRepository<
  Recolector,
  typeof Recolector.prototype.id,
  RecolectorRelations
> {

  public readonly sus_servicios: HasManyRepositoryFactory<Servicio, typeof Recolector.prototype.id>;

  public readonly Su_Empresa: BelongsToAccessor<EmpresaRecicladora, typeof Recolector.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('EmpresaRecicladoraRepository') protected empresaRecicladoraRepositoryGetter: Getter<EmpresaRecicladoraRepository>,
  ) {
    super(Recolector, dataSource);
    this.Su_Empresa = this.createBelongsToAccessorFor('Su_Empresa', empresaRecicladoraRepositoryGetter,);
    this.registerInclusionResolver('Su_Empresa', this.Su_Empresa.inclusionResolver);
    this.sus_servicios = this.createHasManyRepositoryFactoryFor('sus_servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('sus_servicios', this.sus_servicios.inclusionResolver);
  }
}
