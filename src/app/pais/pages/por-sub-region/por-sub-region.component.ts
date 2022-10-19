import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-sub-region',
  templateUrl: './por-sub-region.component.html',
  styles: [
  ]
})
export class PorSubRegionComponent {

    regiones: string[] = [ 'South America', 'Southern Europe', 'Central America', 'Eastern Asia', 'North America'];
    regionActiva: string = '';
    paises: Country[] = [];
  
    constructor(private paisService: PaisService) {}
  
    getClaseCSS(region: string) {
      return region === this.regionActiva
        ? 'btn btn-primary m-1'
        : 'btn btn-outline-primary m-1';
    }
  
    activarRegion(region: string) {

      if(region === this.regionActiva){ return; }

      this.regionActiva = region;
      this.paises = [];
      this.paisService.getPaisPorSubRegion(region).subscribe((paises) => {
        this.paises = paises;
      });
    }
  }