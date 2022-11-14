import {Entity, model, property, hasOne} from '@loopback/repository';
import {EmpresaRecicladora} from './empresa-recicladora.model';

@model({settings: {strict: false}})
export class Administrador extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  Codigo: number;

  @hasOne(() => EmpresaRecicladora)
  suEmpresaRecicladora: EmpresaRecicladora;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
