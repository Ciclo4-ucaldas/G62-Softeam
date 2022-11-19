import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Cliente, Persona } from '../models';
import { Llaves } from '../config/Llaves';
import { AdministradorRepository, ClienteRepository, RecolectorRepository } from '../repositories';
const jwt=require("jsonwebtoken")
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}
  @repository (AdministradorRepository)
  public repositorioAdministrador:AdministradorRepository
  @repository (RecolectorRepository)
  public repositorioRecolector:RecolectorRepository
  @repository (ClienteRepository)
  public repositorioCliente:ClienteRepository
  /*
   * Add service methods here
   */

  async generarToken(usuario:Persona,rol:string){
   /* let rol="";
    let admin= await this.repositorioAdministrador.findOne({where:{correo:usuario.usuario,contrasena:usuario.contrasena}})
    if(admin){
      rol =admin.constructor.name
    }
    if(rol!=""){
      let recol= await this.repositorioRecolector.findOne({where:{usuario:usuario.usuario,contrasena:usuario.contrasena}});
      if(recol){

      rol =recol.constructor.name
      }
    }*/
    let token=jwt.sing({
      data:{
        id:usuario.id,
        correo:usuario.usuario,
        nombres:usuario.Nombres,
        rol:rol

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
  async identificarUsuario(usuario:string,clave:string){
    try {
      let admin= await this.repositorioAdministrador.findOne({where:{usuario:usuario,contrasena:clave}})
      if(admin){
        return admin;
      }
        let recol=await this.repositorioRecolector.findOne({where:{usuario:usuario,contrasena:clave}}) ;
        if(recol){
          return recol;
        }
        let cliente=await this.repositorioCliente.findOne({where:{usuario:usuario,contrasena:clave}}) ;
        if(cliente){
          return cliente;
        }
    } catch (error) {
     console.log(error);
    }
  }
}
