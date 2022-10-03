import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Carro } from 'src/app/models/carro';
import { CarroFirebaseService } from 'src/app/services/carro-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  carros:  Carro[]
  constructor(private router: Router,
    private carroFS: CarroFirebaseService) {
      this.carregarCarros();
  }

  carregarCarros(){
    this.carroFS.getCarros()
    .subscribe(res => {
      this.carros = res.map(c =>{
       return{
        id: c.payload.doc.id,
        ...c.payload.doc.data() as Carro
       }as Carro;
      })
    });
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"])
  }

  irParaDetalhar(carro: Carro){
    this.router.navigateByUrl("/detalhar",
    {state: {objeto:carro}})
  }

}