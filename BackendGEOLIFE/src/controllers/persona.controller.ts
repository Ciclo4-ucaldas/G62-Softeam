import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Persona} from '../models';
import { Credencial } from '../models/credencial.model';
import {PersonaRepository} from '../repositories';
import { AutenticacionService } from '../services';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ) {}
  @post("/identificarPersona",{
    responses:{
      '200':{
        description:"identificar Usuario"
      }
    }
  }
  )
  async identificarUsuario(@requestBody() credencial:Credencial){
    let usuario=await this.servicioAutenticacion.identificarUsuario(credencial.usuario,credencial.contrasena)
    let token;
    if(usuario){
       token =await this.servicioAutenticacion.generarToken(usuario,usuario.constructor.name);
      return{
        datos:{
          nombres:usuario.Nombres,
          correo:usuario.usuario,
          id:usuario.id,
          rol:usuario.constructor.name
        },
        tk:token
      }
    }else {
      throw new HttpErrors[401]("datos invalidos")
    }
  }
}
