import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Recolector, RecolectorRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class RecolectorRepository extends DefaultCrudRepository<
  Recolector,
  typeof Recolector.prototype.id,
  RecolectorRelations
> {

  public readonly sus_servicios: HasManyRepositoryFactory<Servicio, typeof Recolector.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Recolector, dataSource);
    this.sus_servicios = this.createHasManyRepositoryFactoryFor('sus_servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('sus_servicios', this.sus_servicios.inclusionResolver);
  }
}
