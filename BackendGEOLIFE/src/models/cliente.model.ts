import {model, property, hasMany} from '@loopback/repository';
import {Persona} from '.';
import {Servicio} from './servicio.model';

@model()
export class Cliente extends Persona {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasMany(() => Servicio)
  sus_servicios_agendados: Servicio[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
