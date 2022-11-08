import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recolector,
  EmpresaRecicladora,
} from '../models';
import {RecolectorRepository} from '../repositories';

export class RecolectorEmpresaRecicladoraController {
  constructor(
    @repository(RecolectorRepository)
    public recolectorRepository: RecolectorRepository,
  ) { }

  @get('/recolectors/{id}/empresa-recicladora', {
    responses: {
      '200': {
        description: 'EmpresaRecicladora belonging to Recolector',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmpresaRecicladora)},
          },
        },
      },
    },
  })
  async getEmpresaRecicladora(
    @param.path.string('id') id: typeof Recolector.prototype.id,
  ): Promise<EmpresaRecicladora> {
    return this.recolectorRepository.Su_Empresa(id);
  }
}
