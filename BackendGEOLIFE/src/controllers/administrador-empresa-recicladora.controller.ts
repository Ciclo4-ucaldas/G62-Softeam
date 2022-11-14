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
  Administrador,
  EmpresaRecicladora,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorEmpresaRecicladoraController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/empresa-recicladora', {
    responses: {
      '200': {
        description: 'Administrador has one EmpresaRecicladora',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EmpresaRecicladora),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EmpresaRecicladora>,
  ): Promise<EmpresaRecicladora> {
    return this.administradorRepository.suEmpresaRecicladora(id).get(filter);
  }

  @post('/administradors/{id}/empresa-recicladora', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmpresaRecicladora)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaRecicladora, {
            title: 'NewEmpresaRecicladoraInAdministrador',
            exclude: ['RazonSocial'],
            optional: ['administradorId']
          }),
        },
      },
    }) empresaRecicladora: Omit<EmpresaRecicladora, 'RazonSocial'>,
  ): Promise<EmpresaRecicladora> {
    return this.administradorRepository.suEmpresaRecicladora(id).create(empresaRecicladora);
  }

  @patch('/administradors/{id}/empresa-recicladora', {
    responses: {
      '200': {
        description: 'Administrador.EmpresaRecicladora PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaRecicladora, {partial: true}),
        },
      },
    })
    empresaRecicladora: Partial<EmpresaRecicladora>,
    @param.query.object('where', getWhereSchemaFor(EmpresaRecicladora)) where?: Where<EmpresaRecicladora>,
  ): Promise<Count> {
    return this.administradorRepository.suEmpresaRecicladora(id).patch(empresaRecicladora, where);
  }

  @del('/administradors/{id}/empresa-recicladora', {
    responses: {
      '200': {
        description: 'Administrador.EmpresaRecicladora DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EmpresaRecicladora)) where?: Where<EmpresaRecicladora>,
  ): Promise<Count> {
    return this.administradorRepository.suEmpresaRecicladora(id).delete(where);
  }
}
