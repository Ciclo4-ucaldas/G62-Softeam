import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaDeSolicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  estadoSolicitud: number;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Cliente, {name: 'suCliente'})
  clienteId: string;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
