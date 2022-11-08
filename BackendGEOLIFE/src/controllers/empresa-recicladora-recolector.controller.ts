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
  EmpresaRecicladora,
  Recolector,
} from '../models';
import {EmpresaRecicladoraRepository} from '../repositories';

export class EmpresaRecicladoraRecolectorController {
  constructor(
    @repository(EmpresaRecicladoraRepository) protected empresaRecicladoraRepository: EmpresaRecicladoraRepository,
  ) { }

  @get('/empresa-recicladoras/{id}/recolectors', {
    responses: {
      '200': {
        description: 'Array of EmpresaRecicladora has many Recolector',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recolector)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Recolector>,
  ): Promise<Recolector[]> {
    return this.empresaRecicladoraRepository.su_RecolectSor(id).find(filter);
  }

  @post('/empresa-recicladoras/{id}/recolectors', {
    responses: {
      '200': {
        description: 'EmpresaRecicladora model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recolector)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EmpresaRecicladora.prototype.RazonSocial,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recolector, {
            title: 'NewRecolectorInEmpresaRecicladora',
            exclude: ['id'],
            optional: ['empresaRecicladoraId']
          }),
        },
      },
    }) recolector: Omit<Recolector, 'id'>,
  ): Promise<Recolector> {
    return this.empresaRecicladoraRepository.su_RecolectSor(id).create(recolector);
  }

  @patch('/empresa-recicladoras/{id}/recolectors', {
    responses: {
      '200': {
        description: 'EmpresaRecicladora.Recolector PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recolector, {partial: true}),
        },
      },
    })
    recolector: Partial<Recolector>,
    @param.query.object('where', getWhereSchemaFor(Recolector)) where?: Where<Recolector>,
  ): Promise<Count> {
    return this.empresaRecicladoraRepository.su_RecolectSor(id).patch(recolector, where);
  }

  @del('/empresa-recicladoras/{id}/recolectors', {
    responses: {
      '200': {
        description: 'EmpresaRecicladora.Recolector DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recolector)) where?: Where<Recolector>,
  ): Promise<Count> {
    return this.empresaRecicladoraRepository.su_RecolectSor(id).delete(where);
  }
}
