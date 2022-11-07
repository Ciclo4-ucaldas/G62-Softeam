import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly sus_servicios_agendados: HasManyRepositoryFactory<Servicio, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Cliente, dataSource);
    this.sus_servicios_agendados = this.createHasManyRepositoryFactoryFor('sus_servicios_agendados', servicioRepositoryGetter,);
    this.registerInclusionResolver('sus_servicios_agendados', this.sus_servicios_agendados.inclusionResolver);
  }
}
