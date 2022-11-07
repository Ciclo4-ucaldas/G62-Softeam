import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
