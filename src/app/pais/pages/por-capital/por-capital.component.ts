import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
  `,
  ]
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises : Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias : boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino:string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;
    this.paisService.buscarCapital(termino).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
        console.log('Error');
        console.info(err);
      },
    });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarCapital(termino).subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      error: (err) => {
        this.paisesSugeridos = [];
        console.info(err);
      },
    });
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
    this.mostrarSugerencias = false;
  }
}
