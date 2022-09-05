import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisesApiService } from 'src/app/services/paises-api.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  codigoPais:any;
  paisDetalle:any;

  constructor(
    private route: ActivatedRoute,private paisesApiService: PaisesApiService
  ) { }

  ngOnInit(): void {
    this.codigoPais =this.route.snapshot.paramMap.get('codigo');
    this.getDetallePais(this.codigoPais);
  }

  getDetallePais(codigoPais:any){
    this.paisesApiService.obtenerDetallePais(codigoPais)
    .subscribe({
      next:(resultado:any) => {
        console.log(resultado);
        this.paisDetalle = resultado.map((pais:any) => {
          let moneda=Object.entries(pais.currencies).map(([key,value])=> {return (value as any)['name']});
          let nombreNativo=Object.entries(pais.name.nativeName).map(([key,value])=> {return (value as any)['official']});
          let lenguas=Object.entries(pais.languages)
          return {
            codigoPais:pais.ccn3,
            nombrePais: pais.name.common,
            nombreNativo:nombreNativo,
            poblacion:pais.population,
            region:pais.region,
            subregion:pais.subregion,
            capital:pais.capital,
            moneda:moneda,
            lenguas:lenguas,
            fronteras:pais.borders,
            bandera:pais.flags.png
          }
        });
        
      },
      error: (error) => {
      },
      complete: () => {
        this.getFrontera()
      }
    });
  }

  getFrontera(){
    let fronteras:any[] = [];
    // codigoFrontera.map((frontera:any) =>{
    //   this.paisesApiService.obtenerDetallePais(frontera).subscribe((resultado:any)=>{
    //     console.log(resultado[0].name);
    //     fronteras.push(resultado[0].name.common);
    //   })
    // });
    // return fronteras;
    if (this.paisDetalle[0].fronteras){
      this.paisDetalle[0].fronteras.map((frontera:any)=>{
        this.paisesApiService.obtenerDetallePais(frontera).subscribe((resultado:any)=>{
          fronteras.push(resultado[0].name.common);
        }) 
      });
      this.paisDetalle[0]={
        ...this.paisDetalle[0],
        fronteras: fronteras
      }
    }
    
  }
}
