import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class EmpresaRecicladora extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  RazonSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  Nit: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EmpresaRecicladora>) {
    super(data);
  }
}

export interface EmpresaRecicladoraRelations {
  // describe navigational properties here
}

export type EmpresaRecicladoraWithRelations = EmpresaRecicladora & EmpresaRecicladoraRelations;
