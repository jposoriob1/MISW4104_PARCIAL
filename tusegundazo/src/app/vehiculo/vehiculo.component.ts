import { Component, OnInit } from '@angular/core';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }
  vehiculos: Array<Vehiculo> = [];
  consolidado: Array<any> = [];
  vehiculosAgrupados: { marca: string, cantidad: number }[] = [];

  getVehiculos(){
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
      this.vehiculosAgrupados = this.agruparPorMarca(this.vehiculos);
    })
  }

  agruparPorMarca(vehiculos: Vehiculo[]): { marca: string, cantidad: number }[] {
    return vehiculos.reduce((acc: { marca: string, cantidad: number }[], vehiculo) => {
      const marcaExistente = acc.find(item => item.marca === vehiculo.marca);

      if (marcaExistente) {
        marcaExistente.cantidad += 1;
      } else {
        acc.push({ marca: vehiculo.marca, cantidad: 1 });
      }

      return acc;
    }, []);
  }

  ngOnInit() {
    this.getVehiculos();
  }

}
