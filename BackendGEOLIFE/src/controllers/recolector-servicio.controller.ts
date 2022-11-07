import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Recolector,
  Servicio,
} from '../models';
import {RecolectorRepository} from '../repositories';

export class RecolectorServicioController {
  constructor(
    @repository(RecolectorRepository) protected recolectorRepository: RecolectorRepository,
  ) { }

  @get('/recolectors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Recolector has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.recolectorRepository.sus_servicios(id).find(filter);
  }

  @post('/recolectors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Recolector model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Recolector.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInRecolector',
            exclude: ['id'],
            optional: ['recolectorId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.recolectorRepository.sus_servicios(id).create(servicio);
  }

  @patch('/recolectors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Recolector.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.recolectorRepository.sus_servicios(id).patch(servicio, where);
  }

  @del('/recolectors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Recolector.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.recolectorRepository.sus_servicios(id).delete(where);
  }
}
