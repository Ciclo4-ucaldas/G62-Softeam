import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Recolector>) {
    super(data);
  }
}

export interface RecolectorRelations {
  // describe navigational properties here
}

export type RecolectorWithRelations = Recolector & RecolectorRelations;
