import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alimento } from '../alimento';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  idAlimentoSelec: string;
  alimentoEditando: Alimento;
  arrayColeccionAlimentos: any = [{
    id: "",
    data: {} as Alimento
  }];

  constructor(private firestoreService: FirestoreService, private router:Router) {
  
    this.alimentoEditando = {} as Alimento;

    this.obtenerListaAlimentos();
  }
  clickBotonInsertar() {this.router.navigate(['/detalle', "nuevo"]);}

  obtenerListaAlimentos() {
    this.firestoreService
      .consultar('alimentos')
      .subscribe((resultadoConsultaAlimentos) => {
        this.arrayColeccionAlimentos = [];
        resultadoConsultaAlimentos.forEach((datosAlimento: any) => {
          this.arrayColeccionAlimentos.push({
            id: datosAlimento.payload.doc.id,
            data: datosAlimento.payload.doc.data()
          });
        });
      });
  }


  selecAlimento(AlimentoSelec) {
    console.log("Alimento seleccionado: ");
    console.log(AlimentoSelec);
    this.idAlimentoSelec = AlimentoSelec.id;
    this.alimentoEditando.nombre = AlimentoSelec.data.nombre;
    this.alimentoEditando.nombreCientifico = AlimentoSelec.data.nombreCientifico;
    this.router.navigate(['/detalle', this.idAlimentoSelec]);
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("alimentos", this.idAlimentoSelec).then(() => {this.obtenerListaAlimentos();this.alimentoEditando = {} as Alimento;})}

  clicBotonModificar() {
    this.firestoreService.actualizar("alimentos", this.idAlimentoSelec, this.alimentoEditando).then(() => {this.obtenerListaAlimentos();this.alimentoEditando = {} as Alimento;})}
}