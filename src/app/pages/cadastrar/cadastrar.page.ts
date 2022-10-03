import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CarroFirebaseService } from 'src/app/services/carro-firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  data: string
  formCadastrar: FormGroup
  isSubmitted = false
  imagem: any

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private carroFS: CarroFirebaseService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = new Date().toISOString()
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

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.formCadastrar.valid){
      this.presentAlert("Erro", "Cadastro Inválido", "Todos os campos são obrigatorios");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    this.showLoading("Aguarde...", 10000);
    this.carroFS.enviarImagem(this.imagem, this.formCadastrar.value)
    .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert("Agenda", "Sucesso", "Cadastro Realizado");
        this.router.navigate(["/home"]);
    })
    .catch((error) => {
    this.loadingCtrl.dismiss();
    this.presentAlert("Agenda", "Erro", "Erro ao realizar Cadastro!");
    console.log(error);
    })
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });
    loading.present();
    }
}