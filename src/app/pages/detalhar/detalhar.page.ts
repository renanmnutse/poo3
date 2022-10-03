import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Carro } from 'src/app/models/carro';
import { CarroFirebaseService } from 'src/app/services/carro-firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  carro: Carro
  data: string
  edicao: boolean = true;
  isSubmitted: boolean = false;
  formCadastrar: FormGroup;
  
  constructor(private router: Router,
    private alertController: AlertController,
    private carroFS: CarroFirebaseService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.data = new Date().toISOString();
    const nav = this.router.getCurrentNavigation();
    this.carro = nav.extras.state.objeto;
    console.log(this.carro);
    this.formCadastrar = this.formBuilder.group({
      marca: ["",[Validators.required]],
      modelo: ["",[Validators.required]],
      placa: ["",[Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      cor: ["",[Validators.required]],
      ano: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      kilometragem: ["",[Validators.required, Validators.min(1)]],
      dt_ultima_revisao: ["",[Validators.required]],
      dt_prox_revisao:  [""],
      imagem: ["",[Validators.required]],
      });
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.formCadastrar.valid){
      this.presentAlert("Carros", "Erro",
      "Todos os campos são Obrigatórios!");
      return false;
    }else{
      this.editar();
    }
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }


  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  editar(){
    this.carroFS.editarCarro(this.formCadastrar.value,
      this.carro.id)
    .then(()=>{
      this.presentAlert("Carros", "Sucesso", "Edição Realizada");
      this.router.navigate(["/home"]);
    })
    .catch((error)=>{
      this.presentAlert("Carros", "Erro", "Erro ao editar Carro!");
      console.log(error)
    })
  }

  excluir(): void{
    this.presentAlertConfirm("Carros", "Excluir carro", "Você deseja excluir o carro?");
  }

  excluirCarro(){
    this.carroFS.excluirCarro(this.carro)
    .then(()=>{
      this.presentAlert("Agenda", "Sucesso", "Cadastro Excluído!");
      this.router.navigate(["/home"]);
    })
    .catch((error)=>{
      this.presentAlert("Agenda", "Erro", "Carro Não Encontrado!");
      console.log(error);
    })
  }

  async presentAlertConfirm(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //disparar acao
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.excluirCarro();
          },
        },
      ],
    });
    await alert.present();
  };

}
