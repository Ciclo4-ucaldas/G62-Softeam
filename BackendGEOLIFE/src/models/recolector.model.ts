import {Entity, model, property, hasMany} from '@loopback/repository';
import {Servicio} from './servicio.model';

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

  constructor(data?: Partial<Recolector>) {
    super(data);
  }
}

export interface RecolectorRelations {
  // describe navigational properties here
}

export type RecolectorWithRelations = Recolector & RecolectorRelations;
