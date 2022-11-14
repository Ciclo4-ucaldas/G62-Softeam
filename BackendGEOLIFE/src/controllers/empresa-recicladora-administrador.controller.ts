import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EmpresaRecicladora,
  Administrador,
} from '../models';
import {EmpresaRecicladoraRepository} from '../repositories';

export class EmpresaRecicladoraAdministradorController {
  constructor(
    @repository(EmpresaRecicladoraRepository)
    public empresaRecicladoraRepository: EmpresaRecicladoraRepository,
  ) { }

  @get('/empresa-recicladoras/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to EmpresaRecicladora',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof EmpresaRecicladora.prototype.RazonSocial,
  ): Promise<Administrador> {
    return this.empresaRecicladoraRepository.Su_administrador(id);
  }
}
