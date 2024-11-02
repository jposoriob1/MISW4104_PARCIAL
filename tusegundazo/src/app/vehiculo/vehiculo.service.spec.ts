/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoComponent } from './vehiculo.component';
import { VehiculoService } from './vehiculo.service';
import { of } from 'rxjs';
import { Vehiculo } from './vehiculo';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('VehiculoComponent', () => {
  let component: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  let mockVehiculoService: any;

  // Lista de prueba con 3 vehículos
  const VEHICULOS_PRUEBA: Vehiculo[] = [
    {
      id: 1,
      marca: "Renault",
      linea: "Kangoo",
      referencia: "VU Express",
      modelo: 2017,
      kilometraje: 93272,
      color: "Blanco",
      imagen: "https://cdn.group.renault.com/ren/co/vehicles/kangoo/home/renault-kangoo-exterior.jpg"
    },
    {
      id: 2,
      marca: "Chevrolet",
      linea: "Spark",
      referencia: "Life",
      modelo: 2018,
      kilometraje: 55926,
      color: "Plata",
      imagen: "https://turistran.com/2-thickbox_default/chevrolet-spark-life.jpg"
    },
    {
      id: 3,
      marca: "Nissan",
      linea: "March",
      referencia: "Active Plus",
      modelo: 2019,
      kilometraje: 31298,
      color: "Plata",
      imagen: "https://www.elcarrocolombiano.com/wp-content/uploads/2020/08/20200821-NISSAN-MARCH-ACTIVE-REDUCCION-DE-PRECIO-EN-COLOMBIA-01.jpg"
    }
  ];

  beforeEach(async () => {
    
    mockVehiculoService = jasmine.createSpyObj('VehiculoService', ['getVehiculos']);
    
  
    await TestBed.configureTestingModule({
      declarations: [VehiculoComponent],
      imports: [CommonModule, HttpClientTestingModule],
      providers: [
        { provide: VehiculoService, useValue: mockVehiculoService }
      ]
    }).compileComponents();

    
    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;

    
    mockVehiculoService.getVehiculos.and.returnValue(of(VEHICULOS_PRUEBA));

    
    fixture.detectChanges();
  });

  it('lista de vehículos se haya inicializado correctamente', () => {
    
    expect(component.vehiculos.length).toBe(3);
    expect(component.vehiculos[0].marca).toBe('Renault');
  });

  it('Verifica que los vehículos se agrupen correctamente', () => {
    const agrupado = component.agruparPorMarca(component.vehiculos);
    expect(agrupado.length).toBe(3);
    expect(agrupado).toContain(jasmine.objectContaining({ marca: 'Renault', cantidad: 1 }));
    expect(agrupado).toContain(jasmine.objectContaining({ marca: 'Chevrolet', cantidad: 1 }));
    expect(agrupado).toContain(jasmine.objectContaining({ marca: 'Nissan', cantidad: 1 }));
  });

  it('Busca las filas de la tabla', () => {
    
    const tableRows = fixture.nativeElement.querySelectorAll('table tr');
    expect(tableRows.length).toBe(4); // 1 fila de encabezado + 3 filas de datos
  });
});