import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Carro } from '../models/carro';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarroFirebaseService {
  private PATH: string ='carros';
  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage) { }

  getCarro(id: string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getCarros(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  inserirCarro(carro: Carro){
    return this.angularFirestore
    .collection(this.PATH)
    .add({
        marca: carro.marca,
        modelo: carro.modelo,
        placa: carro.placa,
        cor: carro.cor,
        kilometragem: carro.kilometragem,
        ano: carro.ano,
        downloadURL: carro.downloadURL,
        dt_ultima_revisao: carro.dt_ultima_revisao,
        dt_prox_revisao: carro.dt_prox_revisao,
    })
  }

  editarCarro(carro: Carro, id: string){
    return this.angularFirestore
    .collection(this.PATH).doc(id)
    .update({
        marca: carro.marca,
        modelo: carro.modelo,
        placa: carro.placa,
        cor: carro.cor,
        kilometragem: carro.kilometragem,
        ano: carro.ano,
        dt_ultima_revisao: carro.dt_ultima_revisao,
        dt_prox_revisao: carro.dt_prox_revisao,
    })
  }

  excluirCarro(carro: Carro){
    return this.angularFirestore
    .collection(this.PATH).doc(carro.id).delete();
  }

  enviarImagem(imagem: any, carro: Carro){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error('Tipo nao suportado');
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp) => {
          carro.downloadURL = resp;
          this.inserirCarro(carro);
        })
      })
    ).subscribe();
    return task;
  }
}