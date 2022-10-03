import { Injectable } from '@angular/core';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  private _carros : Carro[] = []

  constructor() {
  }

  public get carros(): Carro[]{
    return this._carros;
  }

  public inserir(carro: Carro){
    let dt = new Date(carro.dt_ultima_revisao)
    dt.setFullYear(dt.getFullYear() + 1)
    carro.dt_prox_revisao = dt.toISOString()
    this._carros.push(carro);
  }

  public editar(carro: Carro, modelo: string, placa: string, cor: string, ano: number, dt_ultima_revisao: string): boolean{
    let dt = new Date(dt_ultima_revisao)
    dt.setFullYear(dt.getFullYear() + 1)
    for(let i = 0; i < this._carros.length; i++){
      if(this._carros[i].id == carro.id){
            this.carros[i].modelo = modelo
            this.carros[i].placa = placa
            this.carros[i].cor = cor
            this.carros[i].ano = ano
            this.carros[i].dt_ultima_revisao = dt_ultima_revisao
            this.carros[i].dt_prox_revisao = dt.toISOString()
        return true;
      }
    }
    return false;
  }

  public excluir(carro: Carro): boolean{
    for(let i = 0; i < this._carros.length; i++){
      if(this._carros[i].id == carro.id){
        this._carros.splice(i,1);
        return true;
      }
    }
    return false;
  }

}