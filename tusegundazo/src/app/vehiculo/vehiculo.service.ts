import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Vehiculo } from './vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = environment.baseUrl;


  constructor(private htpp:HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]>{
    return this.htpp.get<Vehiculo[]>(this.apiUrl);
  }

}
