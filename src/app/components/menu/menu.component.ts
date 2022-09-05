import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaisesApiService } from 'src/app/services/paises-api.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //definiendo variables
  paisesList: any[] = [];
  paisesFiltradosPorInput: any;
  paisesFiltradosPorSelect: any;
  paisesFiltrados: any;
  buscadorPais: any = this.fb.control('');
  selectPais: any = this.fb.control(null);

  regiones: any;

  constructor(
    private paisesApiService: PaisesApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //Definiendo las funciones que queremos que se ejecuten
    //cuando el componente menu carga por primera vez
    this.getPaisesList();
  }

  //metodo para obtener el listado de paises del la api
  getPaisesList() {
    this.paisesApiService.obtenerPaises().subscribe({
      next: (resultado: any) => {
        this.paisesList = resultado.map((pais: any) => {
          return {
            codigoPais: pais.ccn3,
            nombrePais: pais.name.common,
            bandera: pais.flags.png,
            region: pais.region,
          };
        });

        this.paisesFiltrados = this.paisesList;

        this.regiones = [
          ...new Set(resultado.map((result: any) => result.region)),
        ];
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  filtro(filtro: string) {
    const valor = filtro.toLowerCase();
    this.paisesFiltrados =
      this.selectPais.value === null
        ? this.paisesList.filter((e: any) =>
            e.nombrePais.toLowerCase().includes(valor)
          )
        : this.paisesList.filter(
            (e: any) =>
              e.nombrePais.toLowerCase().includes(valor) &&
              e.region.toLowerCase() === this.selectPais.value.toLowerCase()
          );
  }

  filtroPorRegion(filtro: string) {
    const valor = filtro ? filtro.toLowerCase() : '';
    console.log(!filtro);
    if (filtro) {
      this.paisesFiltrados =
        this.buscadorPais.value !== ''
          ? this.paisesList.filter(
              (e: any) =>
                e.region.toLowerCase() === valor &&
                e.nombrePais
                  .toLowerCase()
                  .includes(this.buscadorPais.value.toLowerCase())
            )
          : this.paisesList.filter(
              (e: any) => e.region.toLowerCase() === valor
            );
    } else if (this.buscadorPais.value !== '') {
      this.paisesFiltrados = this.paisesList.filter((e: any) =>
        e.nombrePais
          .toLowerCase()
          .includes(this.buscadorPais.value.toLowerCase())
      );
    } else {
      this.paisesFiltrados = this.paisesList;
    }
  }
}
