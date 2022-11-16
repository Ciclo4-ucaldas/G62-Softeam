import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Cliente, Persona } from '../models';
import { Llaves } from '../config/Llaves';
import { AdministradorRepository, RecolectorRepository } from '../repositories';
const jwt=require("jsonwebtoken")
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}
  @repository (AdministradorRepository)
  public repositorioAdministrador:AdministradorRepository
  @repository (RecolectorRepository)
  public repositorioRecolector:RecolectorRepository
  /*
   * Add service methods here
   */
  
  async generarToken(usuario:Persona){ 
    let rol="";
    let admin= await this.repositorioAdministrador.findOne({where:{correo:usuario.usuario,contrasena:usuario.contrasena}})
    if(admin){
      rol =admin.constructor.name
    }
    if(rol!=""){
      let recol= await this.repositorioRecolector.findOne({where:{usuario:usuario.usuario,contrasena:usuario.contrasena}});
      if(recol){
      
      rol =recol.constructor.name
      }
    }
    let token=jwt.sing({
      data:{
        id:usuario.id,
        correo:usuario.usuario,
        nombres:usuario.Nombres,

      }
  
    },Llaves.claveJWT
    )  
    return token;
  }
  validarToken(token:string){
    try{
      let datos=jwt.verify(token,Llaves.claveJWT)
      return datos;

    }catch(error){
      console.log(error);
      return false;

    }
  }
}
