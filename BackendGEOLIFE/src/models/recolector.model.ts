import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Servicio} from './servicio.model';
import {EmpresaRecicladora} from './empresa-recicladora.model';



@model()
export class Recolector extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Carnet: string;

  @hasMany(() => Servicio)
  sus_servicios: Servicio[];

  @belongsTo(() => EmpresaRecicladora, {name: 'Su_Empresa'})
  empresaRecicladoraId: string;

  constructor(data?: Partial<Recolector>) {
    super(data);
  }
}

export interface RecolectorRelations {
  // describe navigational properties here
}

export type RecolectorWithRelations = Recolector & RecolectorRelations;
