import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generator =require("password-generator");
const cryptoJS=require("crypto-js");
const fetch= require("fetch");
@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generator(8,false);
    return clave;
  }
  cifrarClave(clave:string){
    let claveCifrada=cryptoJS.MD5(clave).toString()
    return claveCifrada
  }
  notificacionEmail(){

  }
  notificacionSMS(){
    
  }
}
